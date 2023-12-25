'use client';

import React,{useState,useRef, useEffect} from "react"
import Header from './components/Header/Header'
import { MapContainer, TileLayer, Polyline} from 'react-leaflet'
import { Icon } from "leaflet"
import LocationIcon from "./assets/location.png"
import 'leaflet/dist/leaflet.css'
import DraggableMarker from "./components/Draggable/DraggableMarker";
import axios from "axios"
import { decode } from "@googlemaps/polyline-codec";
import LocationInput from "./components/Form/LocationInput";

export default function Home() {

  // creationg custom icon for marker
  const customIcon = new Icon({
    iconUrl : LocationIcon.src,
    iconSize: [38,38]
  })

  // will store polyline coordinates after fetching from google api
  const [polylinePositons,setPolylinePositions] = useState([])

  // contains latitude and longitude of geolocation of source location and destination
  const [GeoCoardinatesOne,setGeoCoardinatesOne] = useState([0,0])
  const [GeoCoardinatesTwo,setGeoCoardinatesTwo] = useState([0,0])
  
  // will store fuel price and other information
  const [tollInfo,setTollInfo] = useState([])
  const [duration,setDuration] = useState("")

  useEffect(()=>{
    const GeolocationOne = document.getElementById("GeolocationOne")
    const GeolocationOneCountryList = document.getElementById("GeolocationOneCountryList")
    const GeolocationTwo = document.getElementById("GeolocationTwo")
    const GeolocationTwoCountryList = document.getElementById("GeolocationTwoCountryList")

    const setVisiblilty = (e)=>{
      if(!GeolocationOneCountryList.classList.contains("hidden")) {
        if(!(GeolocationOne.contains(e.target) || GeolocationOneCountryList.contains(e.target))){
          checkAndSetGeoCoardinates("GeolocationOne",setGeoCoardinatesOne);
          GeolocationOneCountryList.classList.add("hidden")
        }
      }

      if(!GeolocationTwoCountryList.classList.contains("hidden")){
        if(!(GeolocationTwo.contains(e.target) || GeolocationTwoCountryList.contains(e.target))){
          checkAndSetGeoCoardinates("GeolocationTwo",setGeoCoardinatesTwo);
          GeolocationTwoCountryList.classList.add("hidden")
        } 
      }
    }

    document.addEventListener("click",setVisiblilty)

    return ()=>{
      document.removeEventListener("click",setVisiblilty)
    }
  },[])

  return (
    <>
      
      {/* Header */}
      <Header />
      {/* Toll Calculator */}
      <section className='grid px-4 pt-10 gap-y-12'>
        <h1 className='text-black-main'>TOLL CALCULATOR</h1>
        <div className='flex justify-evenly items-center gap-x-4 w-full px-4 py-2'>
          {/* Toll Calculator Form */}
          <form className="grid gap-y-2 tollCalculatorForm" onSubmit={formHandler}>
            <LocationInput setGeoCoardinates={setGeoCoardinatesOne} className="form-control" type="text" autoComplete="off" placeholder={'🔴 Enter Starting Location'} id="GeolocationOne" />
            <LocationInput setGeoCoardinates={setGeoCoardinatesTwo} className="form-control mb-1" type="text" autoComplete="off" placeholder='🔵 Enter Destination Location' id="GeolocationTwo" />
            <label className="mt-3 text-lg text-black-main" htmlFor="vehicleType">Select Vehicle Type</label>
            <select name="vehicleType" className="form-control mb-6 text-center" id="vehicleType">
              <option disabled={true}>---Select Vehicle Type---</option>
              <option value="2AxlesAuto">Car</option>
              <option value="2AxlesEV">Electric Vehicle</option>
              <option value="3AxlesTruck">Truck</option>
              <option value="2AxlesBus">Bus</option>
              <option value="2AxlesMotorcycle">Motorcycle</option>
              <option value="2AxlesTaxi">Taxi</option>
            </select>
            <button className='form-control text-black-main !bg-yellow-400' type="submit">Calculate</button>
            {
              tollInfo.length>0 && <div className="grid gap-y-2 mt-4 w-full tollInfoBox">
                <h2 className="text-black-main w-full text-center rounded px-2 py-2 mb-2 tollInfoHeading black-main color-white">Toll Info</h2>
                <p className="flex justify-around">Toll Cost: <span id="tollCost">${tollInfo[0]}</span></p>
                <p className="flex justify-around">Distance: <span id="distance">{tollInfo[1]}</span></p>
                <p className="flex justify-around">Duration: <span id="duration">{duration}</span></p>
              </div>
            }
          </form>
          {/* React Leaflet Map */}
          <MapContainer center={[(GeoCoardinatesOne[0]+GeoCoardinatesTwo[0])/2, (GeoCoardinatesOne[1]+GeoCoardinatesTwo[1])/2]} zoom={4} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Geocoardinates will only Changed when Source or Destination input field changed and will cause these two below components to re-render*/}
            <DraggableMarker position={GeoCoardinatesOne} icon={customIcon} text={"Source"} draggable={true} Refid={"GeolocationOne"} />
            <DraggableMarker position={GeoCoardinatesTwo} text={"Destination"} draggable={true} Refid={"GeolocationTwo"} />
            {polylinePositons.length>0 && <Polyline positions={polylinePositons} pathOptions={{color:"crimson"}} />}
          </MapContainer>
        </div>
      </section>
    </>
  )
  
  {/* Fetches Polyline from google api and fetch cost details and other details from source, destination and vehicle type parameters */}
  async function formHandler(event){
    event.preventDefault()
    if(!document.querySelector("#GeolocationOne").value || !document.querySelector("#GeolocationTwo").value)return
    if(!(GeoCoardinatesOne[0]!==0 || GeoCoardinatesOne[1]!==0) || !(GeoCoardinatesTwo[0]!==0 || GeoCoardinatesTwo[1]!==0))return

    const source = `${GeoCoardinatesOne[0]}, ${GeoCoardinatesOne[1]}`
    const destination = `${GeoCoardinatesTwo[0]}, ${GeoCoardinatesTwo[1]}`
    if(source==destination)return;
    try{
    // fetches polyline string and duration from next.js backend
    const response = await axios.get(`/api/Direction?origin=${source}&destination=${destination}`)
    if(response){
      const data = response.data
      setPolylinePositions(decode(data.polyline,5))
      setDuration(data.duration)
      // fetches toll cost and distance from next.js backend
      const tollResponse = await axios.get(`/api/CalculateToll?polyline=${data.polyline}&vehicleType=${event.target.vehicleType.value}`)
      if(tollResponse){
        const tollData = tollResponse.data
        setTollInfo(prev=>[tollData.fuel,tollData.distance])
      }
    }
  }catch(err){
    console.log(err)
  }
 }

 function checkAndSetGeoCoardinates(id,setCoardinates){
    let isOptionSelected = false;

    const allLists = document.querySelectorAll("#"+id+"CountryList li");
    const Geolocation = document.getElementById(id);
    
    for(let i=0;i<allLists.length;i++){
      if(allLists[i].textContent === Geolocation.value){
        setCoardinates([parseFloat(allLists[i].getAttribute("lat")),parseFloat(allLists[i].getAttribute("lng"))]);
        isOptionSelected = true
        break
      }
    }

    if(!isOptionSelected){
      if(allLists.length>0){
        Geolocation.value = allLists[0].textContent;
        setCoardinates([parseFloat(allLists[0].getAttribute("lat")),parseFloat(allLists[0].getAttribute("lng"))]);
      }else{
        Geolocation.value = "";
        setCoardinates([0,0]);
      }
      
    }
 }

}

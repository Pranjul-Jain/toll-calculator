'use client';

import React,{useState,useRef} from "react"
import Header from './components/Header/Header'
import { MapContainer, TileLayer, Polyline} from 'react-leaflet'
import { Icon } from "leaflet"
import LocationIcon from "./assets/location.png"
import 'leaflet/dist/leaflet.css'
import DraggableMarker from "./components/Draggable/DraggableMarker";
import axios from "axios"
import { decode } from "@googlemaps/polyline-codec";

export default function Home() {
  const customIcon = new Icon({
    iconUrl : LocationIcon.src,
    iconSize: [38,38]
  })

  const [polylinePositons,setPolylinePositions] = useState([])
  const GeoCoardinatesOne = useRef([40.69615,-75.18973])
  const GeoCoardinatesTwo = useRef([39.36827914916014, -87.01106199143922])
  
  const [tollInfo,setTollInfo] = useState([])
  const [duration,setDuration] = useState("")
  
  return (
    <>
      <Header />
      <section className='grid px-4 pt-10 gap-y-12'>
        <h1 className='text-black-main'>TOLL CALCULATOR</h1>
        <div className='flex justify-evenly items-center gap-x-4 w-full px-4 py-2'>
          <form className="grid gap-y-2 tollCalculatorForm" onSubmit={formHandler}>
            <input className="form-control" type="text" placeholder={'🔴 Enter Starting Location'} id="GeolocationOne"/>
            <input className="form-control mb-4" type="text" placeholder='🔵 Enter Destination Location' id="GeolocationTwo" />
            <select name="vehicleType" className="form-control mb-6 text-center" id="vehicleType">
              <option disabled={true}>---Select Option---</option>
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
          <MapContainer center={[(GeoCoardinatesOne.current[0]+GeoCoardinatesTwo.current[0])/2, (GeoCoardinatesOne.current[1]+GeoCoardinatesTwo.current[1])/2]} zoom={4} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker position={GeoCoardinatesOne.current} icon={customIcon} text={"Source"} draggable={true} Refid={"GeolocationOne"} coards={GeoCoardinatesOne} />
            <DraggableMarker position={GeoCoardinatesTwo.current} text={"Destination"} draggable={true} Refid={"GeolocationTwo"} coards={GeoCoardinatesTwo} />
            {polylinePositons.length>0 && <Polyline positions={polylinePositons} pathOptions={{color:"crimson"}} />}
          </MapContainer>
        </div>
      </section>
    </>
  )

  async function formHandler(event){
    event.preventDefault()
    const source = `${GeoCoardinatesOne.current[0]}, ${GeoCoardinatesOne.current[1]}`
    const destination = `${GeoCoardinatesTwo.current[0]}, ${GeoCoardinatesTwo.current[1]}`

    const response = await axios.get(`/api/Direction?origin=${source}&destination=${destination}`)
    if(response){
      const data = response.data
      setPolylinePositions(decode(data.polyline,5))
      setDuration(data.duration)
      const tollResponse = await axios.get(`/api/CalculateToll?polyline=${data.polyline}&vehicleType=${event.target.vehicleType.value}`)
      if(tollResponse){
        const tollData = tollResponse.data
        setTollInfo(prev=>[tollData.fuel,tollData.distance])
      }
    }
  }
}

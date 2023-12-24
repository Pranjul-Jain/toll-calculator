'use client';

import React from "react"
import Header from './components/Header/Header'
import { MapContainer, TileLayer} from 'react-leaflet'
import { Icon } from "leaflet"
import LocationIcon from "./assets/location.png"
import 'leaflet/dist/leaflet.css'
import DraggableMarker from "./components/Draggable/DraggableMarker";

export default function Home() {
  const customIcon = new Icon({
    iconUrl : LocationIcon.src,
    iconSize: [38,38]
  })

  const position1 = [40.69615,-75.18973]
  const position2 = [39.36827914916014, -87.01106199143922]
  
  return (
    <>
      <Header />
      <section className='grid px-4 pt-10 gap-y-12'>
        <h1 className='text-black-main'>TOLL CALCULATOR</h1>
        <div className='flex justify-evenly items-center gap-x-4 w-full px-4 py-2'>
          <form className="grid gap-y-2 tollCalculatorForm">
            <input className="form-control" type="text" placeholder={'🔴 Enter Starting Location'} id="GeolocationOne"/>
            <input className="form-control mb-4" type="text" placeholder='🔵 Enter Destination Location' id="GeolocationTwo" />
            <select className="form-control mb-6" id="VehicleType">
              <option disabled={true}>---Select Option---</option>
              <option>MotorCycle</option>
            </select>
            <button className='form-control text-black-main !bg-yellow-400' type="submit">Calculate</button>            
          </form>
          <MapContainer center={[(position1[0]+position2[0])/2, (position1[1]+position2[1])/2]} zoom={4} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker position={position1} icon={customIcon} text={"Source"} draggable={true} Refid={"GeolocationOne"} />
            <DraggableMarker position={position2} text={"Destination"} draggable={true} Refid={"GeolocationTwo"} />
          </MapContainer>
        </div>
      </section>
    </>
  )
}

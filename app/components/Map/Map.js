import dynamic from 'next/dynamic'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Polyline} from 'react-leaflet'

const DraggableMarker = dynamic(() => import('../Draggable/DraggableMarker'), {
    ssr: false
})

const Map = ({children,GeoCoardinatesOne,GeoCoardinatesTwo,polylinePositons}) => {
  return (
    <MapContainer center={[(GeoCoardinatesOne[0]+GeoCoardinatesTwo[0])/2, (GeoCoardinatesOne[1]+GeoCoardinatesTwo[1])/2]} zoom={4} scrollWheelZoom={true}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Geocoardinates will only Changed when Source or Destination input field changed and will cause these two below components to re-render */}
        {children}
        {polylinePositons.length>0 && <Polyline positions={polylinePositons} pathOptions={{color:"crimson"}} />}
    </MapContainer>
  )
}

export default Map
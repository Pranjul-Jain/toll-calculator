'use client'

import React,{useEffect, useRef,useMemo,useState} from 'react'
import { Marker,Popup } from "react-leaflet"
import {Icon} from 'leaflet'
import defaultMarker from "../../assets/markerblue.png"
import axios from "axios"

const DraggableMarker = ({position,...props}) => {
  const markerRef = useRef(null)
  const [markerLocation,setMarkerLocation] = useState(position)
  const defaultIcon = new Icon({
    iconUrl:defaultMarker.src,
    iconSize: [38,38]
  })

  const eventHandlers = useMemo(()=>{
    return {
      dragend: (e)=>{
        const {lat,lng} = e.target._latlng;
        setMarkerLocation(prev=>[lat,lng]);
      }
    }
  })

  useEffect(()=>{
    const controller = new AbortController();
    if(markerLocation && markerLocation.length>0){
        const {lat,lng} = markerRef.current._latlng;
        props.coards.current = markerLocation
        axios.get(`/api/Geolocation?lat=${lat}&lng=${lng}`,{signal:controller.signal}).then(res=>res.data)
        .then(data=>{
          if(props.Refid)document.getElementById(props.Refid).value = data.country
        }).catch(err=>console.log(err))
    }

    return ()=>{
        controller.abort()
    }
  },[markerLocation])


  return (
    <Marker position={position} eventHandlers={eventHandlers} ref={markerRef} icon={props.icon?props.icon:defaultIcon} draggable={props.draggable?true:false}>
        <Popup>
            {props.text?props.text:<>I am a Marker.</>}
        </Popup>
    </Marker>
  )
}

export default DraggableMarker
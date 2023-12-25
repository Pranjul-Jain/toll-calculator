'use client'

import React,{useEffect, useRef,useMemo,useState} from 'react'
import { Marker,Popup } from "react-leaflet"
import {Icon} from 'leaflet'
import defaultMarker from "../../assets/markerblue.png"
import axios from "axios"
import LocationIcon from "../../assets/location.png"

const DraggableMarker = ({position,...props}) => {
  // markerRef will be passed into Marker component as a prop, so that we can access the Marker Properties such as latitude and longitude
  const markerRef = useRef(null)

  // markerLocation will contain the updated latitude and longitude of the marker and only triggers when the marker is dragged
  const [markerLocation,setMarkerLocation] = useState(position)

  const defaultIcon = new Icon({
    iconUrl:defaultMarker.src,
    iconSize: [38,38]
  })

  //creationg custom icon for marker
  const customIcon = new Icon({
    iconUrl : LocationIcon.src,
    iconSize: [38,38]
  })

  // eventHandlers will be passed into Marker component in order handle drag events
  const eventHandlers = useMemo(()=>{
    return {
      dragend: (e)=>{
        const {lat,lng} = e.target._latlng;
        setMarkerLocation(prev=>[lat,lng]);
      }
    }
  },[])

  useEffect(()=>{
    // controller will abort the request as soon as new request is send in order to make it efficient
    const controller = new AbortController();

    if(markerLocation && markerLocation.length>0){
        const {lat,lng} = markerRef.current._latlng;
        if(lat!=0 || lng!=0)
        axios.get(`/api/Geolocation?lat=${lat}&lng=${lng}`,{signal:controller.signal}).then(res=>res.data)
        .then(data=>{
          document.getElementById(props.Refid).value = data.country
        }).catch(err=>console.log(err))
    }
    
    // this is a cleanup function which will be called when the component is unmounted
    return ()=>{
        controller.abort()
    }
  },[markerLocation])


  return (
    <Marker position={position} eventHandlers={eventHandlers} ref={markerRef} icon={props.icon=="true"?customIcon:defaultIcon} draggable={props.draggable?true:false}>
        <Popup>
            {props.text?props.text:<>I am a Marker.</>}
        </Popup>
    </Marker>
  )
}

export default DraggableMarker
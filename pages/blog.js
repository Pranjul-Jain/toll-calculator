// import * as axios from "axios"

// export async function handler(req,res){
//   const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=40.71453, -74.00712&result_type=country&key=AIzaSyDBu-zECoXk_PvbUEeMHbUBf55BIlZ4Em8",{
//     headers:{
//       "Content-Type":"application/json"
//     }
//   });
//   if(response){
//     console.log(response)
//     const data = response.data;
//     const country = data.plus_code.compound_code

//     return res.status(200).json({country:country.slice(country.indexOf(" ")+1)})
//     // if(props.Refid){
//     //   document.getElementById(props.Refid).value = ;
//     // }
//   }else{
//     console.log("error while fetching geoLocation")
//   }
// }
import React from 'react'

const blog = () => {
  return (
    <div>blog</div>
  )
}

export default blog
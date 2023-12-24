'use client'

import React from 'react'

const Features = ({setCurrentCard}) => {
  return (
    <div className="yellow-main grid gap-y-2 px-12 py-8 w-1/2 h-full rounded-lg hover:scale-105 tansition-transform duration-200 ease-in-out cursor-pointer" id="features">
          <h1 className="flex justify-center items-evenly gap-x-4 font-lg font-normal uppercase text-black-main mb-4">features <button className='text-sm bg-transparent w-max text-lg outline-none rounded-none border-x-0 border-y-0 border-b-2 uppercase border-transparent hover:border-indigo-700 pb-1 tollHeaderSubLink' onClick={()=>setCurrentCard(2)}>toll guide</button></h1>
          <ul className="l-none w-full text-black-main text-left">
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Cost breakdown (tolls, gas etc. )</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Toll plazas on map</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Cheapest and Fastest routes</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Truck-compliant route and break stops</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> EV charging stations</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Choose toll tag</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Toll rates (for all payment methods)</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> Reorder stops (Traveling salesman problem)</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> HOS and state mileage report</li>
            <li className="flex items-center text-base"><i className="fa-solid fa-check green-tick mr-4"></i> EV Charger details (connector type, cost etc.)</li>
          </ul>
    </div>
  )
}

export default Features
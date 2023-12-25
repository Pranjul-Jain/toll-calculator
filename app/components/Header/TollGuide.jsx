'use client'

import React from 'react'

const TollGuide = ({setCurrentCard}) => {
  return (
    <div className="yellow-main grid gap-y-2 px-12 py-8 w-1/2 h-full rounded-lg hover:scale-105 tansition-transform duration-200 ease-in-out cursor-pointer" id="guide">
          <h1 className="flex justify-center items-end gap-x-4 font-lg font-normal uppercase text-black-main mb-4">toll guide <button onClick={()=>setCurrentCard(1)} className='text-sm bg-transparent w-max text-lg outline-none rounded-none border-x-0 border-y-0 border-b-2 uppercase border-transparent hover:border-indigo-700 pb-1 tollHeaderSubLink'>Features</button></h1>
          <ol type="1" className="grid gap-y-2 w-full text-black-main text-left">
            <li><p className="flex w-full items-center text-base gap-x-4 text-justify text-lg">1. How to select source and destination?</p>
              <p>{"->"} To select source and destination drag the marker and place anywhere on the map to select source and destination, if country name is shown then there is no street address present in google geolocation api but it will still calculate the toll based on latitude and longitude of that location.</p>
            </li>
            <li><p className="flex items-center text-base gap-x-4 text-justify text-lg">2. How to select vehicle type?</p>
              <p>{"->"} To select vehicle type click on dropdown and select the vehicle type. then click on submit to calculate the toll.</p>
            </li>
          </ol>
    </div>
  )
}

export default TollGuide;
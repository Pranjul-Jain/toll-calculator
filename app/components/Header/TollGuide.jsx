'use client'

import React from 'react'

const TollGuide = ({setCurrentCard}) => {
  return (
    <div className="yellow-main grid gap-y-2 px-12 py-8 w-1/2 h-full rounded-lg hover:scale-105 tansition-transform duration-200 ease-in-out cursor-pointer" id="guide">
          <h1 className="flex justify-center items-end gap-x-4 font-lg font-normal uppercase text-black-main mb-4">toll guide <button onClick={()=>setCurrentCard(1)} className='text-sm bg-transparent w-max text-lg outline-none rounded-none border-x-0 border-y-0 border-b-2 uppercase border-transparent hover:border-indigo-700 pb-1 tollHeaderSubLink'>Features</button></h1>
          <ol type="1" className="w-full text-black-main text-left">
            <li className="flex items-center text-base gap-x-4"><span>1.</span> How do tolls work in the USA</li>
            <li className="flex items-center text-base gap-x-4"><span>2.</span> Which states do not have toll roads?</li>
            <li className="flex items-center text-base gap-x-4"><span>3.</span> Can I pay US tolls with a credit card? </li>
            <li className="flex items-center text-base gap-x-4"><span>4.</span> How do you pay tolls in USA?</li>
            <li className="flex items-center text-base gap-x-4"><span>5.</span> Which toll passes/ toll tags work in all states?</li>
            <li className="flex items-center text-base gap-x-4"><span>6.</span> Is E-ZPass good in all states?</li>
          </ol>
    </div>
  )
}

export default TollGuide;
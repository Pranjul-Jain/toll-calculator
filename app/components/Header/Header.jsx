'use client'

import React,{ useState } from 'react'
import TollFeatures from "./TollFeatures"
import TollGuide from './TollGuide'

const Header = () => {
  const [currentCard, setCurrentCard] = useState(1);
  
  return (
    <div className="flex p-12 justify-space-between items-center gap-x-8">
        <h1 className="uppercase w-1/2 text-black-main">How to calculate Tolls</h1>
        {currentCard==1?<TollFeatures setCurrentCard={setCurrentCard} />:<TollGuide setCurrentCard={setCurrentCard} />}
    </div>
  )
}

export default Header
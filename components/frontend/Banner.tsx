"use client"
import React, { useEffect, useState } from 'react'
import CustomSlider from './Slider'
import Hero from './Hero'

const CustomBanner = (prop:{type:string}) => {
    
    const [hero_type, setHeroType]= useState<string>('')

    useEffect( () => {
        setHeroType(prop.type)
    }, [] )

    function loadherotype() {
        switch (hero_type) {
            case 'slider':
                return <CustomSlider />
        
            default:
                return <Hero />
        }
    }
  
  return loadherotype();
}

export default CustomBanner

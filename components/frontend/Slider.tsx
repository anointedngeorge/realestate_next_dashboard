"use client"
import React from 'react'
// import Slider from "react-slick";
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';


// or only core styles
import '@splidejs/react-splide/css/core';



const CustomSlider = () => {
  const w = 1200;
  const h = 100;
  return (
    <Splide 
    options={ {
      rewind: true,
    } }
    aria-label="---"
    >
    <SplideSlide className="brightness-75" >
    <Image src="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp" className='w-full' width={w} height={h} alt="Image 1" />
    </SplideSlide>
    <SplideSlide className="relative">
    <Image src="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp" className='w-full' width={w} height={h} alt="Image 1" />    </SplideSlide>
  </Splide>
  )
}

export default CustomSlider

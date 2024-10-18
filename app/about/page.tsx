"use client"
import Image from "next/image";
import { useState } from "react";
import FrontendLayout from "@/components/frontend/Layout";


export default function Home() {

  // 
  return (
    <FrontendLayout>
      <div className="flex flex-col space-y-10">
        <div className="shrink-0 w-full h-72 flex items-center place-content-center" style={{
            backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
        }}>
          {/* <div className="hero-overlay bg-opacity-75 w-full"></div> */}
          <h3 className="font-bold text-5xl bg-black text-red-100 px-24 py-3 rounded-lg">About us</h3>
        </div>
        
        <div className="flex place-content-center ">
            <div className="w-2/3 grid grid-cols-2 gap-x-3 max-sm:gap-y-3  max-sm:grid-cols-1">
              <div className="">
                  <Image 
                      src={'https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp'} 
                      width={300} 
                      height={400} 
                      alt="..." 
                      style={{
                        width:'100%',
                        height:'500px'
                      }}
                    />
              </div>
              <div className="flex flex-col space-y-8">
                  <div><h3 className="text-4xl font-bold">About us Title</h3></div>
                  <div className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quod repellendus obcaecati animi? Dolorum obcaecati, id, ducimus aliquam tenetur cum sapiente expedita recusandae voluptatibus at mollitia quam a voluptatem nostrum!
                  </div>
              </div>
            </div>
        </div>
      </div>
    </FrontendLayout>
  );
}

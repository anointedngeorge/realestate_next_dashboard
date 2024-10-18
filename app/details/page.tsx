"use client"

import FrontendLayout from "@/components/frontend/Layout";
import Image from "next/image";




export default function Home() {

  // 
  return (
    <FrontendLayout>
      <div className="flex flex-col space-y-10 ">
        <div className="shrink-0 w-full h-72 flex flex-col items-center place-content-center " style={{
            backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
        }}>
          {/* <div className="hero-overlay bg-opacity-75 w-full"></div> */}
        
          <div><h3 className="font-bold text-5xl bg-black bg-opacity-45 text-red-100 px-24 py-3 rounded-lg z-40">Property Detail Page</h3>
          </div>
          <div><h1 className="font-bold text-5xl bg-opacity-45 text-red-100 px-24 py-3 rounded-lg z-40">Soldout</h1></div>
          
          {/* <p>Any Questions Or remarks? Just Write us a message!</p> */}
        </div>

        <div className="p-8 flex place-content-center">
            <div className="w-3/4  flex flex-col border-4">
            <div><Image src={'https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp'} style={{
              width:'100%',
              height:"300px"
            }} width={100} height={100} alt="..."  /> </div>

            <div><h3>Property list details</h3></div>
            <div></div>

            </div>
        </div>

      </div>
    </FrontendLayout>
  );
}

"use client"
import Image from "next/image";
import { useState } from "react";
import FrontendLayout from "@/components/frontend/Layout";
import MapReader from "@/components/frontend/MapReader";

import { FaFacebook } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";


const FormInput = (prop:{label?:string, name?:string, placeholder?:string, type?:string}) => {
    return (
      <div className="flex flex-col w-full mt-5">
          <div><label className="text-white" >{prop.label}</label></div>
          <div>
              <input type={prop.type} className="p-3 outline-none border-none rounded-full bg-slate-100 w-full" placeholder={prop.placeholder} />
          </div>
      </div>
    )
}

const ContactForm = () => {
  return (
      <form className="bg-slate-600 p-10 rounded-lg" >
          <div className="flex flex-col">
        <div className="text-center" >
            <h3 className="text-4xl text-red-500 drop-shadow ">Contact us</h3>
            <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="flex flex-col content-center space-y-5">
          <div className="flex flex-row max-sm:flex-col space-x-10 max-sm:space-x-0 place-content-center">
              <FormInput type="email" name="email" placeholder="Email Address" label="Email Address" />
              <FormInput type="text" name="fullname" placeholder="Fullname" label="Fullname" />
          </div>
          <div className="w-full">
            <textarea className="w-full bg-slate-100 min-h-44 p-3 rounded-md outline-none"  placeholder="Leave A Message?"></textarea>
          </div>
          <div>
              <button className="btn-md rounded-full bg-slate-200 text-black text-lg w-full hover:bg-slate-700 hover:text-white" >Submit</button>
          </div>
        </div>
        
      </div>
      </form>
  )
}



const OfficeCard = () => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Asaba Office Headquater</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-center flex flex-row space-x-3">
        <div><FaFacebook size={24} /></div>
        <div><FaSquareTwitter size={24} /></div>
        <div><FaInstagramSquare size={24} /></div>
      </div>
    </div>
  </div>
  )
}



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
          <h3 className="font-bold text-5xl text-red-100 px-24 py-3 rounded-lg">Contact us</h3>
          
          {/* <p>Any Questions Or remarks? Just Write us a message!</p> */}
        </div>

        <div className="p-8">
            <h3 className="text-3xl">Our Branch Offices</h3>
            <div className="grid grid-cols-3 max-sm:grid-cols-1">
              <OfficeCard />
              <OfficeCard />
              <OfficeCard />
              
            </div>
        </div>
        
        <div className="flex place-content-center ">
            <div className="w-2/3 max-sm:w-full">
                <ContactForm />
            </div>
        </div>

        <div >
          <MapReader />
        </div>
      </div>
    </FrontendLayout>
  );
}

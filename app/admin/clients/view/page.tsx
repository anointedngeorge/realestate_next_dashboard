"use client"

import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import React, {  Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
// import { FaCopy } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";



const Token = globalThis?.sessionStorage?.getItem("apptoken");

const Home = () => {
    const [clientlist, setClientList] = useState<any>();
    const query = useSearchParams();
    const ID = query?.get('id');

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/account/client/${ID}/list/`, headers:{
        "Authorization":`Bearer ${Token}`
    }});

    useEffect(() => {
        setClientList(ssrdata)
    }, [ssrdata])
    
  return (
    <Suspense fallback="..." >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'View Client '}  />
           
            </div>
            <div className='flex flex-col space-y-3 space-x-4'>
               {/* {JSON.stringify(clientlist)} */}
               <div className="flex flex-col">
                {/* <div className='text-wrap ease-linear'>{`${clientlist?.referral_link}`}</div> */}
                <div className='flex flex-row items-center space-x-8'>
                    <div>
                    <Image src={clientlist?.profile? `${clientlist?.profile}` : `/`} className='rounded-md'  width={150} height={150}  alt='' /></div>
                    {/* <div className='flex flex-row space-x-5'>
                        <span title='copy' className='cursor-pointer ' id={`${clientlist?.referral_link}`}>
                            <FaCopy  color='#dddfff'  size={30} />
                        </span>
                        <span title='Whatsapp Share' className='cursor-pointer' id={`${clientlist?.referral_link}`}>
                            <IoLogoWhatsapp size={30} />
                        </span>
                    </div> */}
                    
                </div>
                <div>
                    {clientlist? (
                    <ul className='list-inside'>
                        <li className='divider'>Personal Information</li>
                        <li><span className='font-bold'>Fullname:</span> {`${clientlist?.surname} ${clientlist?.first_name} ${clientlist?.middle_name}`}</li>
                        <li><span className='font-bold'>Phone:</span> {`${clientlist?.phone_number}`}</li>
                        <li><span className='font-bold'>Occupation:</span> {`${clientlist?.occupation}`}</li>
                        <li><span className='font-bold'>Residential Address:</span> {`${clientlist?.residential_address}`}</li>
                        <li><span className='font-bold'>Office Address:</span> {`${clientlist?.office_address}`}</li>
                        
                        <li className='divider'>Next Of Kin Information</li>
                        
                        <li><span className='font-bold'>kin Name:</span> {`${clientlist?.kin_name}`}</li>
                        <li><span className='font-bold'>Kin Address:</span> {`${clientlist?.kin_address}`}</li>
                        <li><span className='font-bold'>Kin Local Government:</span> {`${clientlist?.kin_lga}`}</li>
                        <li><span className='font-bold'>Kin City:</span> {`${clientlist?.kin_city}`}</li>
                        <li><span className='font-bold'>Kin State:</span> {`${clientlist?.kin_state}`}</li>
                    </ul>
                    ) : "Loading..."}
                </div>
               </div>
            </div>
        </main>
    {/* <PageModal src={modalLink} />                 */}
    </Suspense>
  )
}

export default Home

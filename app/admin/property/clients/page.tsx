"use client"
import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useState } from 'react'
import { PiTreeStructureBold } from "react-icons/pi";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import AdminLayout from '@/components/admin/Layout'


// const Token = globalThis?.sessionStorage?.getItem("apptoken")

const ListActions = ({id, client_id, onclick}:{
            id?:string,
            client_id?:string,
            onclick?:React.MouseEventHandler<HTMLAnchorElement>,

        }) => {
        
    return (
        <ul>


            <li>
                <Link 
                    
                    onClick={onclick} 
                    href={`/admin/property/payment/?id=${id}&client_id=${client_id}`} 
                    className='text-sm font-black'
                >
                    <div className="flex flex-row items-center gap-x-1">
                        <div>
                            <PiTreeStructureBold />
                        </div>
                        <div>Payments</div>
                    </div>
                </Link>
            </li>
            <li>
                <Link 
                onClick={onclick} 
                href={`/admin/property/histories/?id=${id}&client_id=${client_id}`} 
                className='p-2 text-sm font-black'>
                    <div className="flex flex-row items-center gap-x-1">
                        <div>
                            <MdOutlineHistoryToggleOff />
                        </div>
                        <div>Histories</div>
                    </div>
                </Link>
            </li>
        </ul>
    )
}


const ClientPage = () => {
    const query = useSearchParams();
    const ID = query.get("id");
    const ESTATE_NAME = query.get("estate_name");
    const CLIENT_ID = query.get("client_id");
    const data = JSON.parse(String(query.get("data")));


    // const propertylisturl = `${APIBASEURl}/sale/property/client/details/${ID}/`;

    // const {ssrdata} = useCustomSSR({url:`${propertylisturl}`, headers:{
    //     "Authorization":`Bearer ${Token}`
    //   }});

    const [pagelink, setPageLink] = useState(`/admin/property/payment/?id=${ID}&client_id=${CLIENT_ID}`)

    const action = useCallback(( event:React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            setPageLink(event?.currentTarget?.href)
    }, [])

    return (
        <div className='flex flex-row max-sm:flex-col'>
            <div className='w-2/12 shrink-0 p-2 flex flex-col gap-y-8 bg-slate-200 min-h-screen max-h-screen overflow-auto'>
                <div className='flex flex-col place-content-center items-center gap-y-2'>
                    <div className='relative w-20 h-20 drop-shadow-lg border-2  rounded-full '>
                        <Image src={`${data?.profile}`} className='rounded-full' fill={true} alt='...' />
                    </div>
                    <div className='font-black'>
                        {data?.fullname}
                    </div>
                </div>

                {/*  */}
                <div>
                  
                    {ID? (<ListActions onclick={action} id={`${ID}`} client_id={`${CLIENT_ID}`}    />) : ''}
                </div>
            </div>

            <div className='w-5/6 shrink-0 bg-slate-50 border-4 min-h-screen overflow-auto'>
                <h2 className='text-lg font-bold'>{ESTATE_NAME}</h2>
                <iframe src={`${pagelink}`} className='w-full h-full p-3'></iframe>
            </div>
        </div>
    )
}





const Home = () => {
  return (
    <Suspense>
        <AdminLayout>
                <ClientPage />
        </AdminLayout>
    </Suspense>
  )
}

export default Home

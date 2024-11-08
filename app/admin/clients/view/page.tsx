"use client"

import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import React, {  Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
// import { FaCopy } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";



const Token = globalThis?.sessionStorage?.getItem("apptoken");

const Home = () => {
    // const [ssrdata, setssrdata] = useState<>();
    const query = useSearchParams();
    const ID = query?.get('id');

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/account/client/${ID}/list/`, headers:{
        "Authorization":`Bearer ${Token}`
    }});

    // useEffect(() => {
    //     setssrdata(ssrdata)
    // }, [ssrdata])
    
  return (
    <Suspense fallback="..." >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'View Client '}  />
           
            </div>
            <div className='flex flex-col space-y-3 space-x-4'>
               {/* {JSON.stringify(ssrdata)} */}
               <div className="flex flex-col">
                {/* <div className='text-wrap ease-linear'>{`${ssrdata?.referral_link}`}</div> */}
                <div className='flex flex-row items-center space-x-8'>
                    <div>
                    <Image src={ssrdata?.profile? `${ssrdata?.profile}` : `/`} className='rounded-md'  width={150} height={150}  alt='' /></div>
                    {/* <div className='flex flex-row space-x-5'>
                        <span title='copy' className='cursor-pointer ' id={`${ssrdata?.referral_link}`}>
                            <FaCopy  color='#dddfff'  size={30} />
                        </span>
                        <span title='Whatsapp Share' className='cursor-pointer' id={`${ssrdata?.referral_link}`}>
                            <IoLogoWhatsapp size={30} />
                        </span>
                    </div> */}
                    
                </div>
                <div>
                    {ssrdata? (
                    <ul className='list-inside'>
                        <li className='divider'>Personal Information</li>
                        <li><span className='font-bold'>Fullname:</span> {`${ssrdata?.surname} ${ssrdata?.first_name} ${ssrdata?.middle_name}`}</li>
                        <li><span className='font-bold'>Phone:</span> {`${ssrdata?.phone_number}`}</li>
                        <li><span className='font-bold'>Occupation:</span> {`${ssrdata?.occupation}`}</li>
                        <li><span className='font-bold'>Residential Address:</span> {`${ssrdata?.residential_address}`}</li>
                        <li><span className='font-bold'>Office Address:</span> {`${ssrdata?.office_address}`}</li>
                        
                        <li className='divider'>Next Of Kin Information</li>
                        
                        <li><span className='font-bold'>kin Name:</span> {`${ssrdata?.kin_name}`}</li>
                        <li><span className='font-bold'>Kin Address:</span> {`${ssrdata?.kin_address}`}</li>
                        <li><span className='font-bold'>Kin Local Government:</span> {`${ssrdata?.kin_lga}`}</li>
                        <li><span className='font-bold'>Kin City:</span> {`${ssrdata?.kin_city}`}</li>
                        <li><span className='font-bold'>Kin State:</span> {`${ssrdata?.kin_state}`}</li>
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

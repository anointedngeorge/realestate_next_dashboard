"use client"

import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import React, {  Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
// import { FaCopy } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";
import { moneyFormat } from '@/app/utils/utils'



interface Sponsor {
    email: string;
    code: string;
}

interface ClientListInterface {
    referral_link?: string;
    profile?: string;
    code?: string;
    fullname?: string;
    phone?: string;
    addr?: string;
    business_address?: string;
    sponsor?: Sponsor;
    ac_no?: string;
    ac_name?: string;
    bank_name?: string;
    ac_type?: string;
    first_generation_list?: Array<[]>;
    second_generation_list?: Array<[]>;
    third_generation_list?: Array<[]>;
    sales_counter?: number;
    sales_revenue?: number;
    total_commission_paid?: number;
    total_commission_unpaid?: number;
}



const Token = globalThis?.sessionStorage?.getItem("apptoken");

const Home = () => {
    const [clientlist, setClientList] = useState<ClientListInterface>();
    const query = useSearchParams();
    const ID = query?.get('id');

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/account/realtor/${ID}/list/`, headers:{
        "Authorization":`Bearer ${Token}`
    }});

    useEffect(() => {
        setClientList(ssrdata)
    }, [ssrdata])
    
  return (
    <Suspense fallback="..." >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'View Realtor '}  />
           
            </div>
            <div className='flex flex-col space-y-3 space-x-4'>
               {/* {JSON.stringify(clientlist)} */}
               <div className="flex flex-col">
                {/* <div className='text-wrap ease-linear'>{`${clientlist?.referral_link}`}</div> */}
                <div className='flex flex-row items-center space-x-8'>
                    <div>
                    <Image src={clientlist?.profile? `${clientlist?.profile}` : `/images/person_avata.jpeg`} className='rounded-full w-28 h-28'  width={150} height={150}  alt='' /></div>
                   {clientlist? (
                    <div className='flex flex-row space-x-5'>
                        <p>Referral Link</p><br />
                        <span title='copy' className='cursor-pointer ' id={`${clientlist?.referral_link}`}>
                            {/* <FaCopy  color='#dddfff'  size={30} /> */}
                            <p style={{fontSize:"13px", color:'red'}}>{clientlist?.referral_link}</p>
                        </span>
                        {/* <span title='Whatsapp Share' className='cursor-pointer' id={`${clientlist?.referral_link}`}>
                            <IoLogoWhatsapp size={30} />
                        </span> */}
                    </div>
                    ) : '...'}
                    
                </div>
                <div>
                    {clientlist? (
                    <ul className='list-inside'>
                        <li className='divider'>Personal Information</li>
                        <li><span className='font-bold'>Referal Code:</span> <span className='p-1  bg-red-300'>{`${clientlist?.code}`}</span></li>
                        <li><span className='font-bold'>Fullname:</span> {`${clientlist?.fullname}`}</li>
                        <li><span className='font-bold'>Phone:</span> {`${clientlist?.phone}`}</li>
                        <li><span className='font-bold'>Address:</span> {`${clientlist?.addr}`}</li>
                        <li><span className='font-bold'>Business Address:</span> {`${clientlist?.business_address}`}</li>
                        <li><span className='font-bold'>Sponsor:</span> {`${clientlist?.sponsor?.email}`} | {`${clientlist?.sponsor?.code}`}</li>
                        
                        <li className='divider'>Bank Information</li>
                        
                        <li><span className='font-bold'>Bank number:</span> {`${clientlist?.ac_no}`}</li>
                        <li><span className='font-bold'>Acc Name:</span> {`${clientlist?.ac_name}`}</li>
                        <li><span className='font-bold'>Bank Name:</span> {`${clientlist?.bank_name}`}</li>
                        <li><span className='font-bold'>Acc Type:</span> {`${clientlist?.ac_type}`}</li>

                        <li className='divider'>Generation List </li>
                        <li><span className='font-bold'>First Generation:</span> {`${clientlist?.first_generation_list?.length}`}</li>
                        <li><span className='font-bold'>Second Generation:</span> {`${clientlist?.second_generation_list?.length}`}</li>
                        <li><span className='font-bold'>Thrid Generation:</span> {`${clientlist?.third_generation_list?.length}`}</li>

                        <li className='divider'>Sales Information</li>
                        <li><span className='font-bold'>Property Sold:</span> {`${clientlist?.sales_counter}`}</li>
                        
                        <li><span className='font-bold'>Total Revenue:</span> {clientlist?.sales_revenue? `${moneyFormat({country:'en-NG', currency:'NGN'}).format(`${clientlist?.sales_revenue}`)}` : 0.00}</li>
                    
                        <li className='divider'>Commissions</li>
                        <li><span className='font-bold'>Total Paid</span> {clientlist?.total_commission_paid? `${moneyFormat({country:'en-NG', currency:'NGN'}).format(`${clientlist?.total_commission_paid}`)}` : 0.00}</li>
                        <li><span className='font-bold'>Total UnPaid</span> {clientlist?.total_commission_unpaid? `${moneyFormat({country:'en-NG', currency:'NGN'}).format(`${clientlist?.total_commission_unpaid}`)}` : 0.00}</li>
                    </ul>
                    ) : "Loading..."}
                </div>
               </div>
            </div>
        </main>
    {/* <PageModal src={modalLink} />  */}
    </Suspense>
  )
}

export default Home

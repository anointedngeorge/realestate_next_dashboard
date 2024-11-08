"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { useCustomSSR } from "../custom_hooks";
import { APIBASEURl } from "../interface";
import { moneyFormat } from "../utils/utils";
import Image from "next/image";


const Token = globalThis?.sessionStorage?.getItem("apptoken");


  interface GenerationInfo {
    code: string;
    fullname: string;
    account_number: string;
    account_name: string;
    account_type: string;
    bank_name: string;
  }


interface User {
    first_generation_list: [];
    second_generation_list: [];
    third_generation_list: [];
    sales_counter: number;
    sales_revenue: number;
    total_commission_paid: number;
    total_commission_unpaid: number;
    id: string;
    code: string;
    referral_link: string;
    profile: string;
    fullname: string;
    phone: string;
    addr: string;
    state_of_origin: string;
    occupation: string;
    business_address: string;
    next_of_kin: string;
    next_of_kin_address: string;
    next_of_kin_phone: string;
    sponsor: {
      id: string;
      email: string;
      code: string;
      username: string;
    };
    country: {
      code: string;
      name: string;
    };
    sex: string;
    ac_no: string;
    ac_name: string;
    ac_type: string;
    bank_name: string;
    dob: string;
    referal_owner: {
      id: string;
      email: string;
      code: string | null;
      username: string | null;
    };
    process_commission: {
      first_generation: GenerationInfo;
      second_generation: GenerationInfo;
      third_generation: GenerationInfo;
    };
  }
  

  

  const Avatar = () => {
    return (
        <div>
            <Image src={'/images/person_avata.png'} width={300} height={300} alt="..." />
        </div>
    )
  }




export default function Home() {
    const [realtordata, setRealtorData] = useState<User>();
    const [ID, setID] = useState<string>('90232383');
    const searchRef = useRef<HTMLInputElement | null>(null)

    
    
    const findarealtor = useCallback( () => {
        const realtors_input_search_bar = searchRef.current?.value;
        setID(`${realtors_input_search_bar}`);
    }, [] )
    
    
    const {ssrdata, ssrstatus} = useCustomSSR({url:`${APIBASEURl}/account/realtors/${ID}/list/`, headers:{
        "Authorization":`Bearer ${Token}`,
    }});

    useEffect(() => {
        if (ssrdata) {
            setRealtorData(ssrdata);
        }
    }, [ssrdata])


    

  // 
  return (
        <main className="w-screen bg-gray-400 p-1 flex  place-content-center text-white font-bold">
            <div className="w-3/4 space-y-8 shadow-white drop-shadow-lg shadow-lg min-h-screen flex flex-col p-8 bg-black bg-opacity-40">
                <div className="flex  place-content-center space-x-2">
                    <div className="w-2/3 shrink-0">
                        <input 
                            ref={searchRef}
                            type="text"  
                            className="w-full placeholder:text-yellow-400 input input-lg outline-none border-none   bg-black text-yellow-400" 
                            placeholder="Type/Paste Your Realtor's ID Here"
                        />
                    </div>
                    <div><button onClick={findarealtor} className="btn btn-lg btn-warning">Find</button></div>
                </div>
                <div className="text text-xs">
                {realtordata? (
                    <ul className='list-inside'>
                        <li className='divider divider-warning '>Personal Information</li>
                        <li><span>Referal Link</span>: <span className="text-yellow-400">{`${realtordata?.referral_link}`}</span> </li>
                        <li><span className='font-bold text text-yellow-400'>Referal Code:</span> <span className='p-1  text-red-300'>{`${realtordata?.code}`}</span></li>
                        <li><span className='font-bold text text-yellow-400'>Fullname:</span> {`${realtordata?.fullname}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Phone:</span> {`${realtordata?.phone}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Address:</span> {`${realtordata?.addr}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Business Address:</span> {`${realtordata?.business_address}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Sponsor:</span> {`${realtordata?.sponsor?.email}`} | {`${realtordata?.sponsor?.code}`}</li>
                        
                        <li className='divider divider-warning '>Bank Information</li>
                        
                        <li><span className='font-bold text text-yellow-400'>Bank number:</span> {`${realtordata?.ac_no}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Acc Name:</span> {`${realtordata?.ac_name}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Bank Name:</span> {`${realtordata?.bank_name}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Acc Type:</span> {`${realtordata?.ac_type}`}</li>

                        <li className='divider divider-warning '>Generation List </li>
                        <li><span className='font-bold text text-yellow-400'>First Generation:</span> {`${realtordata?.first_generation_list?.length}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Second Generation:</span> {`${realtordata?.second_generation_list?.length}`}</li>
                        <li><span className='font-bold text text-yellow-400'>Thrid Generation:</span> {`${realtordata?.third_generation_list?.length}`}</li>

                        <li className='divider divider-warning '>Sales Information</li>
                        <li><span className='font-bold text text-yellow-400'>Property Sold:</span> {`${realtordata?.sales_counter}`}</li>
                        
                        <li><span className='font-bold text text-yellow-400'>Total Revenue:</span> {realtordata?.sales_revenue? `${moneyFormat({country:'en-NG', currency:'NGN'}).format(`${realtordata?.sales_revenue}`)}` : 0.00}</li>
                    
                        <li className='divider divider-warning '>Commissions</li>
                        <li><span className='font-bold text text-yellow-400'>Total Paid</span> {realtordata?.sales_revenue? `${moneyFormat({country:'en-NG', currency:'NGN'}).format(`${realtordata?.total_commission_paid}`)}` : 0.00}</li>
                        <li><span className='font-bold text text-yellow-400'>Total UnPaid</span> {realtordata?.sales_revenue? `${moneyFormat({country:'en-NG', currency:'NGN'}).format(`${realtordata?.total_commission_unpaid}`)}` : 0.00}</li>
                    </ul>
                    ) : (
                        <div className="flex flex-col place-content-center items-center space-y-2">
                            <div><Avatar /></div>
                            <div><h3 className="text-2xl font-sans text text-yellow-400">Realtors Profile</h3></div>
                            <div>
                                {ssrstatus? "Data is loading..." : ""}
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </main>
  );
}

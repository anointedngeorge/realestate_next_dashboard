"use client";

import React from 'react'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { addSettings } from '@/app/actions/auth'



const Token = globalThis?.sessionStorage?.getItem("apptoken")

const Home = () => {
    // const context = useContext(ThemeContext)
    const {action} = useCustomActionState({fn:addSettings});

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/control/settings/list/`, headers:{
        "Authorization":`Bearer ${Token} `
      }});



  return (
        <main className='font-sans p-3 flex flex-col space-y-8'>
            <div><h3>General Settings</h3></div>
            <div>
                <form action={action} >
                    <div className="flex flex-col space-y-6">
                        <div className='row-span-1'>
                            <label  >Company Name</label><br />
                            <input type="text" defaultValue={ssrdata?.company_name} name='company_name' placeholder="website Name" className="input input-bordered w-full" />  
                        </div>
                        <div className='row-span-1'>
                            <label  >Company Phone</label><br />
                            <input defaultValue={ssrdata?.company_phone} type="tel" name='company_phone' placeholder="website Phone" className="input input-bordered w-full" />  
                        </div>
                        <div className='row-span-1'>
                            <label  >Office Address</label><br />
                            <input defaultValue={ssrdata?.office_address} type="text" placeholder="Office Address" name='office_address' className="input input-bordered w-full" />  
                        </div>

                        <div className='row-span-1'>
                            <label  >Company short Description</label><br />
                            <textarea defaultValue={ssrdata?.company_description} maxLength={100} name="company_description" className='textarea w-full border-2 border-gray-300' placeholder='Site Description'></textarea>
                        </div>

                        <div className='row-span-1'>
                            <label  >Notification</label><br />
                            <select className='select w-full border-2 border-gray-300' name="notification" >
                                {ssrdata?.notification ? (
                                    <option defaultValue={ ssrdata.notification} selected >{ ssrdata.notification}</option>
                                ) : ''}
                                <option value="sms">SMS</option>
                                <option value="email">Email</option>
                                <option value="both">SMS/EMAIL</option>
                            </select>
                        </div>


                        <div className='text-right'>
                            <button type="submit" className='btn-warning btn btn-xs'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
  )
}

export default Home

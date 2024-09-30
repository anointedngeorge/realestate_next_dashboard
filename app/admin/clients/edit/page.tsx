"use client"
import { addnewclient } from '@/app/actions/auth'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { FormModel } from '@/app/globalcomponent'
import { APIBASEURl, externalurls } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import React, { ChangeEvent, Suspense, useCallback, useEffect, useState } from 'react'

import { Country }  from 'country-state-city';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'





const Token = globalThis?.sessionStorage?.getItem("apptoken")





const Home = () => {
    const [clientlist, setClientList] = useState<{title:any, value:any}[]>();
    const [plotlist, setPlotList] = useState<{title:any, value:any}[]>();
    const [preview, setPreview] = useState<string>('');

    const query = useSearchParams();
    const ID = query?.get('id');

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/account/client/${ID}/list/`, headers:{
        "Authorization":`Bearer ${Token}`
    }});

    
    const changeProfile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
    }, [])


    useEffect(() => {
        const countries = Country.getAllCountries();
        let country_list:any = [];
        countries.map((item) => {
            country_list.push({title:`${item.name} ${item.flag}`, value:item.isoCode})
        })
        setPlotList(country_list)

        setPreview(ssrdata?.profile)
    }, [ssrdata])


    const {state, action, status} = useCustomActionState({fn:addnewclient});

  return (
    <Suspense fallback='...'>
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
          
                <LineTitle heading={'Edit Clients'}  />
              
            </div>
            <div className='flex flex-col space-y-3 mt-3'>
               <form action={action} >
                    <div className="flex flex-col place-content-center items-center space-y-3">
                        <div className='w-32 h-32 border-2 rounded-full relative'>
                            <Image src={`${preview}`} className='rounded-full' fill={true} alt='...' />
                        </div>
                        <div>
                            <label className='btn btn-sm btn-primary' >
                                <input onChange={changeProfile} type="file" name="profile" style={{
                                    width:"0px"
                                }} />
                                Select Picture
                            </label>
                        </div>
                    </div>
                    <FormModel  models={[
                      
                        {datamodel:[
                            {labelname:'Surname', value:`${ssrdata?.surname}`,  name:'surname', type:'text', placeholder:'Surname'},
                            {labelname:'Middlename', value:`${ssrdata?.middle_name}`, name:'middle_name', type:'text', placeholder:'MiddleName'},
                            {labelname:'Firstname', value:`${ssrdata?.first_name}`, name:'first_name', type:'text', placeholder:'First Name'},
                        ]},

                        {datamodel:[
                            {labelname:'Phone Number', value:`${ssrdata?.phone_number}`, name:'phone_number', type:'text', placeholder:'Phone Number'},
                            {labelname:'Sex', selectdata:[
                                {title:'Male', value:'male'},
                                {title:'Female', value:'female'},
                            ], name:'sex', type:'select'},

                            {labelname:'Marital Status', selectdata:[
                                {title:'Single', value:'single'},
                                {title:'Married', value:'Married'},
                                {title:'Others', value:'others'},
                            ], name:'marital_status', type:'select'},
                        ]},

                        {datamodel:[
                            {labelname:'Spouse', value:`${ssrdata?.s_surname}`, name:'s_surname', type:'text', placeholder:'Spouse Name'},
                            {labelname:'Spouse MiddleName', value:`${ssrdata?.s_middle_name}`, name:'s_middle_name', type:'text', 
                                placeholder:'Spouse MiddleName'},
                            {labelname:'Spouse Firstname', value:`${ssrdata?.s_first_name}`, name:'s_first_name', type:'text', 
                                placeholder:'Spouse Firstname'},

                            {labelname:'Spouse Email', value:`${ssrdata?.s_email}`, name:'s_email', type:'email', 
                                    placeholder:'Spouse Email'},
                        ]},
                        {datamodel:[
                            {labelname:'Spouse Phone', value:`${ssrdata?.s_phone_number}`, name:'s_phone_number', type:'text', 
                                placeholder:'Spouse Phone'},
                            {labelname:'Country', selectdata:plotlist, name:'country', type:'select'},
                        ]},

                        {datamodel:[
                            {labelname:'Occupation', value:`${ssrdata?.occupation}`, name:'occupation', type:'text', placeholder:'Occupation' },
                            {labelname:'employer', value:`${ssrdata?.employer}`, name:'employer', type:'text', placeholder:'employer' },
                            {labelname:'residential_address', value:`${ssrdata?.residential_address}`, name:'residential_address', type:'text', placeholder:'residential_address' },
                            {labelname:'office_address', value:`${ssrdata?.office_address}`, name:'office_address', type:'text', placeholder:'office_address' },

                        ]},

                        {datamodel:[
                            {labelname:'Local Government', value:`${ssrdata?.lga}`,  name:'lga', type:'text', placeholder:'Local Government'},
                            {labelname:'city', value:`${ssrdata?.city}`,  name:'city', type:'text', placeholder:'city'},
                            {labelname:'state', value:`${ssrdata?.state}`,  name:'state', type:'text', placeholder:'state'},
                            {labelname:'country Residence',  selectdata:plotlist, name:'country_residence', type:'select'},
                            
                        ]},

                        {datamodel:[
                            {labelname:'Kin Name', value:`${ssrdata?.kin_name}`, name:'kin_name', type:'text', placeholder:'Name'},
                            {labelname:'kin Address', value:`${ssrdata?.kin_address}`,  name:'kin_address', type:'text', placeholder:'kin address'},
                            {labelname:'kin Lga',  value:`${ssrdata?.kin_lga}`, name:'kin_lga', type:'text', placeholder:'kin lga'},
                        ]},

                        {datamodel:[
                            {labelname:'kin city', value:`${ssrdata?.kin_city}`, name:'kin_city', type:'text', placeholder:'kin city'},
                            {labelname:'kin state', value:`${ssrdata?.kin_state}`,  name:'kin_state', type:'text', placeholder:'kin state'},
                            {labelname:'kin tel', value:`${ssrdata?.kin_tel}`, name:'kin_tel', type:'text', placeholder:'kin tel'},
                           
                        ]},
                        {datamodel:[
                            {labelname:'kin Email', value:`${ssrdata?.kin_email}`,  name:'kin_email', type:'email', placeholder:'kin email'},
                        ]},
                    ]}  />
                    <br />
                    <div className="flex flex-row place-content-between">
                        <div>
                            <button className='btn btn-sm btn-primary text-info' type="submit">Update</button>
                        </div>
                        {/* <div><button className='btn text-warning' type="reset">Reset</button></div> */}
                    </div>
                    <br />
               </form>
            </div>
        </main>
    {/* <PageModal src={modalLink} /> */}
    </Suspense>
  )
}

export default Home

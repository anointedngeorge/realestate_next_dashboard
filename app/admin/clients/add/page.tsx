"use client"
import { addnewclient, addnewrealtors, addnewsales } from '@/app/actions/auth'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { FormModel, LinkBtn, PageModal } from '@/app/globalcomponent'
import { externalurls, ThemeContext } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import Link from 'next/link'
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";
import useSWR from 'swr'
import { Country, State, City }  from 'country-state-city';
import Image from 'next/image'





const Token = globalThis?.sessionStorage?.getItem("apptoken")





const Home = () => {
    const [clientlist, setClientList] = useState<{title:any, value:any}[]>();
    const [plotlist, setPlotList] = useState<{title:any, value:any}[]>();
    const [preview, setPreview] = useState<string>('');

    const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.userlist}`, headers:{
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
        let container:any = [];
        ssrdata?.map((item:any, index:number) => {
            container.push({title:item?.email, value:item?.id })
        })
        setClientList(container);

        const countries = Country.getAllCountries();
        let country_list:any = [];
        countries.map((item) => {
            country_list.push({title:`${item.name} ${item.flag}`, value:item.isoCode})
        })
        setPlotList(country_list)

    }, [ssrdata])


    const {state, action, status} = useCustomActionState({fn:addnewclient});

  return (
    < >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Add New Clients'}  />
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
                            {labelname:'Client Email', name:'email', type:'text', placeholder:'Client Email'},
                        ]},
                        {datamodel:[
                            {labelname:'Surname', name:'surname', type:'text', placeholder:'Surname'},
                            {labelname:'Middlename', name:'middle_name', type:'text', placeholder:'MiddleName'},
                            {labelname:'Firstname', name:'first_name', type:'text', placeholder:'First Name'},
                        ]},

                        {datamodel:[
                            {labelname:'Phone Number', name:'phone_number', type:'text', placeholder:'Phone Number'},
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
                            {labelname:'Spouse', name:'s_surname', type:'text', placeholder:'Spouse Name'},
                            {labelname:'Spouse MiddleName', name:'s_middle_name', type:'text', 
                                placeholder:'Spouse MiddleName'},
                            {labelname:'Spouse Firstname', name:'s_first_name', type:'text', 
                                placeholder:'Spouse Firstname'},

                            {labelname:'Spouse Email', name:'s_email', type:'email', 
                                    placeholder:'Spouse Email'},
                        ]},
                        {datamodel:[
                            {labelname:'Spouse Phone', name:'s_phone_number', type:'text', 
                                placeholder:'Spouse Phone'},
                            {labelname:'Country', selectdata:plotlist, name:'country', type:'select'},
                        ]},

                        {datamodel:[
                            {labelname:'Occupation', name:'occupation', type:'text', placeholder:'Occupation' },
                            {labelname:'employer', name:'employer', type:'text', placeholder:'employer' },
                            {labelname:'residential_address', name:'residential_address', type:'text', placeholder:'residential_address' },
                            {labelname:'office_address', name:'office_address', type:'text', placeholder:'office_address' },

                        ]},

                        {datamodel:[
                            {labelname:'Local Government',  name:'lga', type:'text', placeholder:'Local Government'},
                            {labelname:'city',  name:'city', type:'text', placeholder:'city'},
                            {labelname:'state',  name:'state', type:'text', placeholder:'state'},
                            {labelname:'country Residence', selectdata:plotlist, name:'country_residence', type:'select'},
                            
                        ]},

                        {datamodel:[
                            {labelname:'Kin Name',  name:'kin_name', type:'text', placeholder:'Name'},
                            {labelname:'kin Address',  name:'kin_address', type:'text', placeholder:'kin address'},
                            {labelname:'kin Lga',  name:'kin_lga', type:'text', placeholder:'kin lga'},
                        ]},

                        {datamodel:[
                            {labelname:'kin city',  name:'kin_city', type:'text', placeholder:'kin city'},
                            {labelname:'kin state',  name:'kin_state', type:'text', placeholder:'kin state'},
                            {labelname:'kin tel',  name:'kin_tel', type:'text', placeholder:'kin tel'},
                           
                        ]},
                        {datamodel:[
                            {labelname:'kin Email',  name:'kin_email', type:'email', placeholder:'kin email'},
                        ]},
                    ]}  />
                    <br />
                    <div className="flex flex-row place-content-between">
                        <div>
                            <button className='btn text-info' type="submit">Submit</button>
                        </div>
                        <div><button className='btn text-warning' type="reset">Reset</button></div>
                    </div>
                    <br />
               </form>
            </div>
        </main>
    {/* <PageModal src={modalLink} /> */}
    </>
  )
}

export default Home

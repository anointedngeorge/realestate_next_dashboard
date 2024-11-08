"use client"
import { addnewrealtors } from '@/app/actions/auth'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { FormModel } from '@/app/globalcomponent'
import { APIBASEURl } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import React, { ChangeEvent, Suspense, useCallback, useEffect, useState } from 'react'
import { Country }  from 'country-state-city';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'



const Token = globalThis?.sessionStorage?.getItem("apptoken");

const Home = () => {
    // const [clientlist, setClientList] = useState<any>();
    const [plotlist, setPlotList] = useState<{title:string, value:string}[]>();
    
    const [preview, setPreview] = useState<string>(``);

    const query = useSearchParams();
    const ID = query?.get('id');

    

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/account/realtor/${ID}/list/`, headers:{
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
        
        // setClientList(ssrdata)
        const countries = Country.getAllCountries();
        const country_list:{title:string, value:string}[] = [];
        countries.map((item) => {
            country_list.push({title:`${item.name} ${item.flag}`, value:item.isoCode})
        })
        setPlotList(country_list)

        const prof = ssrdata?.profile ? ssrdata?.profile : ''
        setPreview(prof)

    }, [ssrdata])
    
    

    const {action} = useCustomActionState({fn:addnewrealtors});

  return (
    <Suspense fallback="..." >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Edit Realtor '}  />
           
            </div>
            <div className='flex flex-col space-y-3'>
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
                    <br />
                    <FormModel  models={[
                        {datamodel:[
                            {labelname:'Title', selectdata:[
                                {title:'Mr', value:'Mr'},
                                {title:'Mrs', value:'Mrs'},
                                {title:'Miss', value:'Miss'},
                            ], name:'name_title', type:'select'},

                            
                            
                        ]},
                        
                        {datamodel:[
                            {labelname:'Fullname', value:`${ssrdata?.fullname}`, name:'fullname', type:'text', placeholder:'Fullname'},
                            {labelname:'Phone', value:`${ssrdata?.phone}`, name:'phone', type:'tel', placeholder:'Phone number'},
                            {labelname:'Address', value:`${ssrdata?.addr}`, name:'addr', type:'text', placeholder:'Address'},
                        ]},

                        {datamodel:[
                            {labelname:'State Of Origin', value:`${ssrdata?.state_of_origin}`, name:'state_of_origin', type:'text', placeholder:'State Of Origin'},
                            {labelname:'occupation', value:`${ssrdata?.occupation}`, name:'occupation', type:'text', placeholder:'Occupation'},
                            {labelname:'Business Address', value:`${ssrdata?.business_address}`, name:'business_address', type:'text', placeholder:'Business Address'},
                        ]},

                        {datamodel:[
                            {labelname:'Next Of Kin', value:`${ssrdata?.next_of_kin}`, name:'next_of_kin', type:'text', placeholder:'Kin'},
                            {labelname:'Next Of Kin Address', value:`${ssrdata?.next_of_kin_address}`, name:'next_of_kin_address', type:'text', 
                                placeholder:'Kin Address'},
                            {labelname:'Next Of Kin Phone', value:`${ssrdata?.next_of_kin_phone}`, name:'next_of_kin_phone', type:'text', placeholder:'Kin Phone'},
                        ]},
                        {datamodel:[
                            // {labelname:'Sponsor', selectdata:clientlist, name:'sponsor_id', type:'select'},
                            {labelname:'Country', 
                                selectdefault:{title:`${ssrdata?.country?.name}`, 
                            value:`${ssrdata?.country?.code}`},  selectdata:plotlist, name:'country', type:'select'},
                        ]},

                        {datamodel:[
                            {labelname:'Sex',  selectdata:[
                                {title:'Male', value:'male'},
                                {title:'Female', value:'female'},
                            ], name:'sex', type:'select'},

                            {labelname:'DOB', value:`${ssrdata?.dob}`, name:'dob', type:'date', },

                        ]},

                        {datamodel:[
                            {labelname:'Account Number', value:`${ssrdata?.ac_no}`, name:'ac_no', type:'text', placeholder:'Account Number'},
                            {labelname:'Account Name', value:`${ssrdata?.ac_name}`, name:'ac_name', type:'text', placeholder:'Account Name'},
                            {labelname:'Account Type', value:`${ssrdata?.ac_type}`,  name:'ac_type', type:'text', placeholder:'Account Type'},
                            {labelname:'Bank Name', value:`${ssrdata?.bank_name}`,  name:'bank_name', type:'text', placeholder:'Bank Name'},
                        ]},
                    ]}  />
                    <br />
                    <div className="flex flex-row place-content-between">
                        <div>
                            <button className='btn btn-sm btn-primary  text-info' type="submit">Update</button>
                        </div>
                        {/* <div><button className='btn text-warning' type="reset">Reset</button></div> */}
                    </div>
                    <br />
               </form>
            </div>
        </main>
    {/* <PageModal src={modalLink} />                 */}
    </Suspense>
  )
}

export default Home

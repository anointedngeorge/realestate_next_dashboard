"use client"
import { addnewrealtors } from '@/app/actions/auth'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { FormModel } from '@/app/globalcomponent'
import { externalurls } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Country }  from 'country-state-city';
import Image from 'next/image'

const Token = globalThis?.sessionStorage?.getItem("apptoken")

const Home = () => {
    // const [clientlist, setClientList] = useState<{title:string, value:string}[]>();
    const [plotlist, setPlotList] = useState<{title:string, value:string}[]>();
    const [preview, setPreview] = useState<string>('');

    const {ssrdata} = useCustomSSR({url:`${externalurls.realtorlist}`, headers:{
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
        // const container:{title:string, value:string}[] = [];
        // ssrdata?.map((item:{email:string, id:string}) => {
        //     container.push({title:item?.email, value:item?.id })
        // })

        // setClientList(container);

        const countries = Country.getAllCountries();
        const country_list:{title:string, value:string}[] = [];
        countries.map((item) => {
            country_list.push({title:`${item.name} ${item.flag}`, value:item.isoCode})
        })
        setPlotList(country_list)

    }, [ssrdata])

    const {action} = useCustomActionState({fn:addnewrealtors});

  return (
    < >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Add New Realtors'}  />
            </div>
            <div className='flex flex-col space-y-3'>
               <form action={action} >
                    <div className="flex flex-col place-content-center items-center space-y-3">
                        <div className='w-32 h-32 border-2 rounded-full relative'>
                            <Image src={`${preview}`} className='rounded-full' fill={true} alt='...' />
                        </div>
                        <div>
                            <label className='btn btn-sm btn-primary' >
                                <input required onChange={changeProfile} type="file" name="profile" style={{
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

                            {labelname:'Referal Code', name:'referal_code', type:'text', placeholder:'Optional'},
                        ]},
                        {datamodel:[
                            {labelname:'Realtors Email', name:'email', type:'text', placeholder:'Realtors Email'},
                        ]},
                        {datamodel:[
                            {labelname:'Fullname', name:'fullname', type:'text', placeholder:'Fullname'},
                            {labelname:'Phone', name:'phone', type:'tel', placeholder:'Phone number'},
                            {labelname:'Address', name:'addr', type:'text', placeholder:'Address'},
                        ]},

                        {datamodel:[
                            {labelname:'State Of Origin', name:'state_of_origin', type:'text', placeholder:'State Of Origin'},
                            {labelname:'occupation', name:'occupation', type:'text', placeholder:'Occupation'},
                            {labelname:'Business Address', name:'business_address', type:'text', placeholder:'Business Address'},
                        ]},

                        {datamodel:[
                            {labelname:'Next Of Kin', name:'next_of_kin', type:'text', placeholder:'Kin'},
                            {labelname:'Next Of Kin Address', name:'next_of_kin_address', type:'text', 
                                placeholder:'Kin Address'},
                            {labelname:'Next Of Kin Phone', name:'next_of_kin_phone', type:'text', placeholder:'Kin Phone'},
                        ]},
                        {datamodel:[
                            // {labelname:'Sponsor', selectdata:clientlist, name:'sponsor_id', type:'select'},
                            {labelname:'Country', selectdata:plotlist, name:'country', type:'select'},
                        ]},

                        {datamodel:[
                            {labelname:'Sex', selectdata:[
                                {title:'Male', value:'male'},
                                {title:'Female', value:'female'},
                            ], name:'sex', type:'select'},

                            {labelname:'DOB', name:'dob', type:'date', },

                        ]},

                        {datamodel:[
                            {labelname:'Account Number',  name:'ac_no', type:'text', placeholder:'Account Number'},
                            {labelname:'Account Name',  name:'ac_name', type:'text', placeholder:'Account Name'},
                            {labelname:'Account Type',  name:'ac_type', type:'text', placeholder:'Account Type'},
                            {labelname:'Bank Name',  name:'bank_name', type:'text', placeholder:'Bank Name'},
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
    {/* <PageModal src={modalLink} />                 */}
    </>
  )
}

export default Home

"use client"
import { FormModel, LinkBtn, PageModal } from '@/app/globalcomponent'
import Chartjs from '@/components/admin/Chartjs'
import Datatable from '@/components/admin/Datatable'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";
import useSWR from 'swr'



const Home = () => {
 const [modalLink, setModalLink] = useState('')

 const createNewPage = useCallback( (event:any) => {
    event.preventDefault();
    const modal:any = document.getElementById('my_modal_4');
    const href = event.currentTarget.href;
    setModalLink(href)
    if (modal) {
        modal?.showModal();
    }

 }, [] )

  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Add New Property'}  />
            </div>
            <div className='flex flex-col space-y-3'>
               <form action="">
                    <FormModel  models={[
                        {datamodel:[
                            {labelname:'firstname', placeholder:'Enter firstname', name:'firstname', type:'text'},
                            {labelname:'lastname', placeholder:'Enter lastname', name:'lastname', type:'text'},
                            {labelname:'MiddelName', placeholder:'Enter middle', name:'middelname', type:'text'},
                        ]},

                        {datamodel:[
                            {labelname:'Emaill Address', placeholder:'Email Address', name:'email', type:'email'},
                            {labelname:'Password', placeholder:'******', name:'password', type:'password'},
                        ]},

                        {datamodel:[
                            {labelname:'Products', selectdata:[
                                {value:'jeans', title:'Jeans'}
                            ], name:'email', type:'select'},
                            
                        ]},
                        {datamodel:[
                            {labelname:'Description', placeholder:'Description', name:'description', type:'textarea'},
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
    <PageModal src={modalLink} />                
    </AdminLayout>
  )
}

export default Home

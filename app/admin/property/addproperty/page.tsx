"use client"
import { addnewproperty, addnewsales } from '@/app/actions/auth'
import { useCustomActionState } from '@/app/custom_hooks'
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


const Token = globalThis?.sessionStorage?.getItem("apptoken")

const Home = () => {
 const [modalLink, setModalLink] = useState('')
 const {state, action, status} = useCustomActionState({fn:addnewproperty});


  return (
    < >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Add New Property'}  />
            </div>
            <div className='flex flex-col space-y-3'>
               <form action={action}>
                    <FormModel  models={[
                        {datamodel:[
                            {labelname:'estate', placeholder:'estate', name:'estate', type:'text'},
                            {labelname:'status', placeholder:'status', name:'status', type:'text'},
                            {labelname:'location', placeholder:'location', name:'location', type:'text'},
                        ]},

                        {datamodel:[
                            {labelname:'selling price', placeholder:'selling price', name:'selling_price', type:'text '},
                            {labelname:'selling price in words', placeholder:'price in words', name:'selling_price_in_words', type:'text'},
                        ]},

                        {datamodel:[
                            {labelname:'plot qty', placeholder:'plot qty', name:'plot_qty', type:'text '},
                            {labelname:'plot qty sold', placeholder:'plot qtysold', name:'plot_qty_sold', type:'text '},
                            {labelname:'promo price', placeholder:'promo_price', name:'promo_price', type:'text'},
                        ]},

                        {datamodel:[
                            {labelname:'about estate heading', placeholder:'Estate Heading', name:'about_estate_heading', type:'text '},
                            // {labelname:'promo price', placeholder:'promo_price', name:'promo_price', type:'text'},
                        ]},


                        {datamodel:[
                            {labelname:'about estate', placeholder:'about estate', name:'about_estate', type:'textarea'},
                            {labelname:'title', placeholder:'title', name:'title', type:'textarea'},
                        ]},

                        {datamodel:[
                            {labelname:'size', placeholder:'size', name:'size', type:'text '},
                            {labelname:'topography', placeholder:'topography', name:'topography', type:'text'},
                            {labelname:'instant allocation', placeholder:'instant_allocation', name:'instant_allocation', type:'text'},
                            {labelname:'sold out', name:'sold_out', type:'number '},
                        ]},

                        {datamodel:[
                            {labelname:'Posted By Which Realtor', placeholder:'Referal Code', name:'posted_by', type:'text'},
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
    </>
  )
}

export default Home

"use client"
import { LinkBtn, PageModal } from '@/app/globalcomponent'
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
                <LineTitle heading={'Property Listing'}  />
            </div>
            <div className='flex flex-col space-y-3'>
                <div>
                    <LinkBtn onclick={createNewPage} link='/admin/' title='Create New' />
                </div>
                <div>
                    <CustomTable 
                        thead={['name', 'amount','purchase date']}
                        tbody={[
                            {name:'Onovo', amount:'350000', purchase_date:'2024-03-09' },
                            {name:'George', amount:'40000', purchase_date:'2024-03-10' },
                            {name:'Anthony', amount:'45000', purchase_date:'2024-03-10' },
                        ]}
                        mapper={['name','amount','purchase_date']}
                        placeholder_values={{'$name':"data.amount"}}
                        actions={[
                          {name:'View Product', link:'/admin/products/$name/'},
                          {name:'Delete', link:'/admin/products/$name/'},
                          
                        ]}
                    />
                </div>
            </div>
        </main>
    <PageModal src={modalLink} />                
    </AdminLayout>
  )
}

export default Home

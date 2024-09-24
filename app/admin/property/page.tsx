"use client"


import Chartjs from '@/components/admin/Chartjs'
import Datatable from '@/components/admin/Datatable'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";
import useSWR from 'swr'

import { useCustomSSR } from '@/app/custom_hooks'
import { LinkBtn, PageModal } from '@/app/globalcomponent'
import { externalurls, ThemeContext } from '@/app/interface'

const Home = () => {
    const [modalLink, setModalLink] = useState('')
 
    const [propertylist, setPropertyList] = useState<any>();
    const context = useContext(ThemeContext)
    const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.propertylist}`, headers:{
        "Authorization":`Bearer ${context?.token} `
      }});

    useEffect(() => {
        setPropertyList(ssrdata)
    }, [ssrdata])



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
            <LineTitle heading={'Property Listing'} content={[
                    {
                      title:"Create ",
                      link:'property/addproperty/', 
                      classname:'btn btn-sm btn-primary',
                      onclick:createNewPage
                    }
                ]} />
            </div>
            <div className='flex flex-col space-y-3'>
                
                <div>
                    <CustomTable 
                        thead={['estate','Selling Price','quantity','sold','size','status']}
                        tbody={propertylist}
                        mapper={['estate','selling_price.amount','plot_qty','plot_qty_sold','size','status']}
                        placeholder_values={{'$id':"data.id"}}
                        actions={[
                          {name:'View Product', link:'/admin/products/$id/'},
                          {name:'Delete', link:'/admin/products/$id/'},
                          
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
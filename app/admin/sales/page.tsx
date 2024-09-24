"use client"
import { useCustomSSR } from '@/app/custom_hooks'
import { FormModel, LinkBtn, PageModal } from '@/app/globalcomponent'
import { externalurls, ThemeContext } from '@/app/interface'
import Chartjs from '@/components/admin/Chartjs'
import Datatable from '@/components/admin/Datatable'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";
import useSWR from 'swr'



const Home = () => {
 const [modalLink, setModalLink] = useState('')
 
 const [datalist, setDataList] = useState<any>();
    const context = useContext(ThemeContext)
    const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.saleslist}`, headers:{
        "Authorization":`Bearer ${context?.token} `
      }});

    useEffect(() => {
        setDataList(ssrdata)
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
        <main className='flex flex-col space-y-4 h-screen overflow-auto'>
            <div>
                <LineTitle heading={'Sales'} content={[
                    {
                      title:"Create ",
                      link:'sales/addsales', 
                      classname:'btn btn-sm btn-primary',
                      onclick:createNewPage
                    }
                ]} />
            </div>
            <div className='flex flex-col space-y-3'>
            <CustomTable 
                        thead={[
                          'plots','land use',
                          'number plots','plot size',
                          'selling price','discount','purchase_price',
                          'initial_payment','first_commission',
                          'second_commission','third_commission',
                          'Realtors Referal Code'
                        ]}
                        tbody={datalist}
                        mapper={[
                            'plots','land_use','number_plots',
                            'plot_size','selling_price',
                            'discount','purchase_price',
                            'initial_payment','first_commission',
                            'second_commission','third_commission',
                            'consultant_email_address'
                          ]}
                        placeholder_values={{'$id':"data.id"}}
                        actions={[
                          {name:'View Product', link:'/admin/products/$id/'},
                          {name:'Delete', link:'/admin/products/$id/'},
                          
                        ]}
                    />
            </div>
        </main>
    <PageModal src={modalLink} />                
    </AdminLayout>
  )
}

export default Home

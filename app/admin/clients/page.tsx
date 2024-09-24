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
    const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.clientlist}`, headers:{
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
            <LineTitle heading={'Clients'} content={[
                    {
                      title:"Create ",
                      link:'clients/add', 
                      classname:'btn btn-sm btn-primary',
                      onclick:createNewPage
                    }
                ]} />
            </div>
            <div className='flex flex-col space-y-3'>
            <CustomTable 
                        thead={[
                          'surname','firstname',
                          'middlename','tel',
                          'sex','marital status',
                          'spouse surname','spouse middlename','spouse firstname',
                          'spouse tel','country'
                        ]}
                        tbody={datalist}
                        mapper={[
                            'surname','first_name',
                            'middle_name','phone_number',
                            'sex','marital_status',
                            's_surname','s_middle_name','s_middle_name',
                            's_phone_number','country.name'
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

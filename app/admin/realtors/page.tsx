"use client"
import { useCustomSSR } from '@/app/custom_hooks'
import {PageModal } from '@/app/globalcomponent'
import { externalurls, ThemeContext } from '@/app/interface'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import React, { useCallback, useContext, useEffect, useState } from 'react'




const Home = () => {
 const [modalLink, setModalLink] = useState('')
 
 const [datalist, setDataList] = useState<[]>();
    const context = useContext(ThemeContext)

    const {ssrdata} = useCustomSSR({url:`${externalurls.realtorlist}`, headers:{
        "Authorization":`Bearer ${context?.token} `
      }});

    useEffect(() => {
        setDataList(ssrdata)
    }, [ssrdata])


    const createNewPage = useCallback( (event:React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const modal:HTMLElement | null  = document.getElementById('my_modal_4');
      const href = event.currentTarget.href;
      setModalLink(href)
      if (modal && modal instanceof HTMLDialogElement) {
          modal?.showModal();
      }
   }, [] )



  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4 h-screen overflow-auto'>
            <div>
            <LineTitle heading={'Realtors'} content={[
                    {
                      title:"Register Realtors ",
                      link:'realtors/add', 
                      classname:'btn btn-sm btn-ghost',
                      onclick:createNewPage
                    }
                ]} />
            </div>
            <div className='flex flex-col space-y-3'>
            <CustomTable 
                        thead={[
                          'code','fullname','sponsor','tel',
                          'origin','country','acccount no',
                          'account name','account type','bank name']}
                        tbody={datalist? datalist : []}
                        mapper={['code','fullname','sponsor.code','phone',
                          'state_of_origin','country.name','ac_no','ac_name',
                          'ac_type','bank_name']}
                        placeholder_values={{'$id':"data.id"}}
                        actions={[
                          {name:'View', link:'/admin/products/$id/', id:'$id', onclick(event) {
                            event.preventDefault();
                            const id = event.currentTarget.id;
                            // const data = [...datalist?.filter((id: object) => id === id)];

                            const modal: HTMLElement | null = document.getElementById('my_modal_4');

                            setModalLink(`/admin/realtors/view/?id=${id}`)

                            if (modal && modal instanceof HTMLDialogElement) {
                                modal?.showModal();
                            }

                        },},
                          {name:'Edit', link:'/admin/products/$id/', id:'$id', onclick(event) {
                              event.preventDefault();
                              const id = event.currentTarget.id;
                              // const data = [...datalist?.filter((id: object) => id === id)];

                              const modal:HTMLElement | null = document.getElementById('my_modal_4');

                              setModalLink(`/admin/realtors/edit/?id=${id}`)

                              if (modal && modal instanceof HTMLDialogElement) {
                                  modal?.showModal();
                              }

                          },},
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

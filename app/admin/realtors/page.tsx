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
 
 const [datalist, setDataList] = useState<any>();
    const context = useContext(ThemeContext)

    const {ssrdata} = useCustomSSR({url:`${externalurls.realtorlist}`, headers:{
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
            <LineTitle heading={'Realtors'} content={[
                    {
                      title:"Create ",
                      link:'realtors/add', 
                      classname:'btn btn-sm btn-primary',
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
                        tbody={datalist}
                        mapper={['code','fullname','sponsor.code','phone',
                          'state_of_origin','country.name','ac_no','ac_name',
                          'ac_type','bank_name']}
                        placeholder_values={{'$id':"data.id"}}
                        actions={[
                          // {name:'View', link:'/admin/products/$id/'},
                          {name:'Edit', link:'/admin/products/$id/', id:'$id', onclick(event) {
                              event.preventDefault();
                              const id = event.currentTarget.id;
                              const data = [...datalist?.filter((id: object) => id === id)];

                              const modal:any = document.getElementById('my_modal_4');

                              setModalLink(`/admin/realtors/edit/?id=${id}`)
                              if (modal) {
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

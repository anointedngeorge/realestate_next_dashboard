"use client"
import { useCustomSSR } from '@/app/custom_hooks'
import { PageModal } from '@/app/globalcomponent'
import { externalurls, ThemeContext } from '@/app/interface'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import React, { useCallback, useContext, useEffect, useState } from 'react'




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
        <main className='flex flex-col space-y-4 h-screen '>
            <div>
            <LineTitle heading={'Clients'} content={[
                    {
                      title:"Create ",
                      link:'clients/add', 
                      classname:'btn btn-sm btn-warning',
                      onclick:createNewPage
                    }
                ]} />
            </div>
            <div className='flex flex-col space-y-3 overflow-auto'>
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
                          {name:'Edit', link:'/admin/products/$id/', id:'$id', onclick(event) {
                            event.preventDefault();
                            const id = event.currentTarget.id;
                            const data = [...datalist?.filter((id: object) => id === id)];

                            const modal:any = document.getElementById('my_modal_4');

                            setModalLink(`/admin/clients/edit/?id=${id}`)
                            if (modal) {
                                modal?.showModal();
                            }

                        }},
                          // {name:'View', link:'/admin/products/$id/'},
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

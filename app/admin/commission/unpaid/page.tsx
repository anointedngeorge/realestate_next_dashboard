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
    const {ssrdata} = useCustomSSR({url:`${externalurls.commission}/unpaid/`, headers:{
        "Authorization":`Bearer ${context?.token} `
      }});

    useEffect(() => {
        setDataList(ssrdata)
    }, [ssrdata])


  //   const createNewPage = useCallback( (event:any) => {
  //     event.preventDefault();
  //     const modal:any = document.getElementById('my_modal_4');
  //     const href = event.currentTarget.href;
  //     setModalLink(href)
  //     if (modal) {
  //         modal?.showModal();
  //     }
  
  //  }, [] )


  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4 h-screen overflow-auto'>
            <div>
              {/* {JSON.stringify(ssrdata)} */}
                <LineTitle heading={'UnPaid Commissions'} />
            </div>
            <div className='flex flex-col space-y-3'>
            <CustomTable 
                        thead={[
                          'Realtor',
                          'estate',
                          'Initial Property Amount',
                          'Commission Earned',
                          'Payment Status','Date'
                        ]}
                        tbody={datalist}
                        mapper={[
                            'consultant.fullname',
                            'property_sales.selling_plots.estate',
                            'property_sales.initial_payment',
                            'earnings',
                            'status_message',
                            'paid_time'
                          ]}
                        placeholder_values={{'$id':"data.id"}}
                        actions={[
                          {
                            name:'Confirm',
                            link:'/$id',
                            id: '$id',
                            onclick(event) {
                                event.preventDefault();
                                
                                // break
                                if ( !confirm("Are You Sure?") ) { return "Failed"; }

                                const id = event.currentTarget.id;
                                const ft = fetch(`${externalurls.commission}/confirm/${id}/paid/`, {
                                      headers:{
                                        "Authorization":`Bearer ${context?.token}`
                                      }
                                  });
                                  ft.then( f => {
                                        if (f.ok) {
                                            globalThis.location.reload();
                                        } else {
                                            alert(f.statusText)
                                        }
                                  })
                              },
                            },
                        ]}
                    />
            </div>
        </main>
    <PageModal src={modalLink} />                
    </AdminLayout>
  )
}

export default Home

"use client"


import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react'


import { useCustomSSR } from '@/app/custom_hooks'
import { PageModal } from '@/app/globalcomponent'
import { APIBASEURl, externalurls, ThemeContext } from '@/app/interface'
import {useSearchParams} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


const LayoutDiv = ({title, value}:{title:string, value:string}) => {
    return (
        <div className="grid grid-cols-2 items-baseline space-y-10">
            <div className='shrink-0 text-red-500 font-black'>{title}</div>
            <div className='shrink-0 text-wrap '>{value? value : '...'}</div>
        </div>
    )
}


const ListClients = ({token, ID, onclick, estate_name}:{estate_name?: string, onclick?:React.MouseEventHandler<HTMLAnchorElement> , token:string, ID:string}) => {
    const propertylisturl = `${APIBASEURl}/sale/property/client/details/${ID}/`;

    const {ssrdata} = useCustomSSR({url:`${propertylisturl}`, headers:{
        "Authorization":`Bearer ${token}`
      }});
    return (
        <div className='flex flex-shrink-0 gap-2  overflow-auto '>
            {ssrdata?.map(((item:{first_name:string, surname:string, profile:string, id:string}, index:number) => (
                <Link 
                    // onClick={ onclick }
                    title={item?.surname} 
                    className='shadow btn min-w-40 text-center text-sm font-bold p-2 rounded-3xl even:bg-red-300 odd:bg-slate-500' 
                    key={`${item}_${index}`}
                    // /admin/property/clients/?id=${ID}&client_id=${item.id}&data=${JSON.stringify({profile:item?.profile, fullname:`${item?.surname} ${item?.first_name}`})}
                    href={{ pathname:'/admin/property/clients/', query:{
                            id:ID, 
                            client_id:item?.id,
                            estate_name:estate_name,
                            data: `${JSON.stringify({profile:item?.profile, fullname:`${item?.surname} ${item?.first_name}`})}`} }}
                 >

                    <div className="flex flex-row items-center gap-x-1">
                        <div className='relative'>
                            <Image src={`${item?.profile}`} width={20} height={20} alt='...' className='rounded-full  border-black ' />
                        </div>
                        <div className='text-white drop-shadow'>{item?.surname} {item?.first_name}</div>
                    </div>
                </Link>
            ))) }
        </div>
    )
}



const PropertyHome = () => {
    const [modalLink, setModalLink] = useState('')
 
    const [propertylist, setPropertyList] = useState<any>();
    const context = useContext(ThemeContext)
    const query = useSearchParams();
    const ID =  query.get("id")

    const propertylisturl = `${APIBASEURl}/properties/property/${ID}/list/`;
    const {ssrdata} = useCustomSSR({url:`${propertylisturl}`, headers:{
        "Authorization":`Bearer ${context?.token}`
      }});

    useEffect(() => {
        setPropertyList(ssrdata)
    }, [ssrdata])



 const createNewPage = useCallback( (event:any) => {
    event.preventDefault();
    const modal:any = document.getElementById('my_modal_4');
    const href = event.currentTarget.href;
    setModalLink("")
    if (modal) {
        modal?.showModal();
        setModalLink(href)
    }

 }, [] )

  return (
    <AdminLayout >
          <main className='flex flex-col space-y-4 h-screen'>
              <div>
                
              <LineTitle heading={`${ssrdata?.estate ? ssrdata?.estate : '...'}`} content={[
                      {
                        title:"Create New Estate ",
                        link:'property/addproperty/', 
                        classname:'btn btn-sm btn-warning',
                        onclick:createNewPage
                      }
                  ]} />
              </div>
              <div className='flex flex-col space-y-3'>
                  <div className='flex flex-row space-x-2 overflow-auto font-black'>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/sales/addsales/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>Sales</Link> 
                        </div>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/property/addimages/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>Add Images</Link> 
                        </div>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/property/addvideo/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>Add Videos</Link> 
                        </div>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/property/installation/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>Installation Plan</Link> 
                        </div>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/property/neighbourhood/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>Neighbourhood</Link> 
                        </div>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/property/utilities/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>utilities</Link> 
                        </div>
                        <div> 
                            <Link className='btn btn-sm btn-primary' href={`/admin/property/downloads/?id=${ID}`} onClick={ (event) => {
                                event.preventDefault();
                                const modal:any = document.getElementById('my_modal_4');
                                const href = event.currentTarget.href;
                                
                                if (modal) {
                                    setModalLink('')
                                    modal?.showModal();
                                    setModalLink(href)
                                }
                            } }>Downloads</Link> 
                        </div>
                  </div>
                  <div className='p-6 rounded bg-gray-50 shadow-lg drop-shadow-lg flex flex-col'>
                        <div className='p-3 flex flex-col space-y-3'>
                            <div className='flex flex-row gap-2 items-center '>
                                <div>Estate Clients</div>
                                <div><input type="search" className='input-xs border-2 border-black rounded' placeholder='search' /></div>
                            </div>
                            <div><ListClients estate_name={`${ssrdata?.estate}`} onclick={createNewPage} token={`${context?.token}`} ID={`${ID}`} /></div>
                        </div>
                        <LayoutDiv title={`Estate`} value={`${ssrdata?.estate}`} />
                        <LayoutDiv title={`Selling Price`} value={`${ssrdata?.selling_price?.amount}`} />
                        <LayoutDiv title={`Plot Available`} value={`${ssrdata?.plot_qty}`} />
                        <LayoutDiv title={`Plot Sold`} value={`${ssrdata?.plot_qty_sold}`} />
                        <LayoutDiv title={`Topography`} value={`${ssrdata?.topography}`} />
                        {/* <LayoutDiv title={`Estate`} value={`${ssrdata?.estate}`} />
                        <LayoutDiv title={`Estate`} value={`${ssrdata?.estate}`} />
                        <LayoutDiv title={`Estate`} value={`${ssrdata?.estate}`} /> */}
                        <LayoutDiv title={`Location`} value={`${ssrdata?.location}`} />
                  </div>
              </div>
          </main>
      <PageModal src={modalLink} />                
    </AdminLayout>

  )
}



const Home = () => {

    return (
        <Suspense>
            <PropertyHome />
        </Suspense>
    )
}


export default Home
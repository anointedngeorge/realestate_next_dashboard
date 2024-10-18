"use client"
import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { moneyFormat } from '@/app/utils/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'



const Token = globalThis?.sessionStorage?.getItem("apptoken")


const PayView = (prop:{title?:string, value?:string}) => {
    return (
        <div className='bg-slate-200 p-3 flex flex-col col-span-1'>
            <div className='text-right font-black'>{prop?.title}</div>
            <div><strong>
                {prop?.value? prop?.value : '...'}
            </strong></div>
        </div>
    )
}



const HomePage = () => {

    const query = useSearchParams();
    const id = query.get('id')
    const client_id = query.get('client_id')

    const propertylisturl = `${APIBASEURl}/sale/property/client/${id}/${client_id}`;

    const {ssrdata} = useCustomSSR({url:`${propertylisturl}`, headers:{
        "Authorization":`Bearer ${Token}`
      }});

    return (
        <div className='flex flex-col px-3 space-y-3'>
            <div className='font-black text-3xl'>Payment Section</div>
            {/* <div>
                <Link href={``} className='btn btn-sm btn-primary' >Balance sheet</Link>
            </div> */}

            <div className='flex flex-col space-y-4'>

                <div className='grid grid-flow-col gap-2'>
                    <PayView title='Plot Owned' value={`${ssrdata?.plots}`} />
                    <PayView title='Total Paid' value={moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.total_amount}`)}/>
                    <PayView title='Debt' value={moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.debt}`)} />
                    
                </div>
                {/* <div>
                    <Link href={''} className='btn btn-primary w-full '>
                        Update Payment
                    </Link>
                </div> */}
              
            </div>
        </div>
    )
}


const Home = () => {
  return (
    <Suspense>
        <HomePage />
    </Suspense>
  )
}

export default Home


'use client'
import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { moneyFormat } from '@/app/utils/utils'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'


const Token = globalThis?.sessionStorage?.getItem("apptoken")

const ReceiptPage = () => {
    const query = useSearchParams();
    const sale_id =  query.get('sale_id');
    const estate_id =  query.get("estate_id");
    const client_id = query.get("client_id");

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/sale/property/balancesheet/${sale_id}/${estate_id}/${client_id}/`, headers:{
        "Authorization":`Bearer ${Token}`
      }});

    return (
        <div className='p-3 flex flex-col'>
            <div className='p-2 bg-gray-800 text-white'>
                <h3>{ssrdata?.selling_plots?.estate}</h3>
                <p className='p-2 bg-gray-400'>Initial Payment {moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.initial_payment}`)} </p>
                <p className='p-2 bg-slate-200 text-black'>Soldout Price {moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.selling_price}`)} </p>
                <p className='p-2 bg-red-500'>Total Price {moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.acume}`)} </p>
            </div>
            <div>
                <table className='table table-sm'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Previous Balance</td>
                            <td>Amount Paid</td>
                            <td>Date Of Payment</td>
                        </tr>
                    </thead>
                    <tbody>
                        { ssrdata?.balances?.map((item:{
                                previous_balance:number,
                                balance:number,
                                created:string
                            }, index:number) => (
                            <tr key={`receipt_${index}`}>
                                <td>{index+1}</td>
                                <td>{moneyFormat({country:'en-NG', currency:'NGN'}).format(`${item?.previous_balance}`)} </td>
                                <td>{moneyFormat({country:'en-NG', currency:'NGN'}).format(`${item?.balance}`)}</td>
                                <td>{item?.created}</td>
                            </tr>
                        )) }
                        
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}



const page = () => {
  return (
    <Suspense>
        <ReceiptPage />
    </Suspense>
  )
}

export default page
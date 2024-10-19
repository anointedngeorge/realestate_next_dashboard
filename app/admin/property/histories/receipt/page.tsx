
'use client'
import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'
import { moneyFormat } from '@/app/utils/utils'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { FiPrinter } from "react-icons/fi";

const Token = globalThis?.sessionStorage?.getItem("apptoken")

const ReceiptPage = () => {
    const query = useSearchParams();
    const sale_id =  query.get('sale_id');
    const estate_id =  query.get("estate_id");
    const client_id = query.get("client_id");

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/sale/property/balancesheet/${sale_id}/${estate_id}/${client_id}/`, headers:{
        "Authorization":`Bearer ${Token}`
      }});

      const printbtn = () => {
        const printarea = document.getElementById('printarea');
      
        if (printarea) {
          // Create a new window for printing
          const newWindow  = window.open('', '', 'width=1000, height=1000');
          if (newWindow) {
            
          
          // Write the HTML content of the print area to the new window
          newWindow.document.write(`
            <html>
              <head>
                <title>Print</title>
              </head>
              <body>
                ${printarea.innerHTML}
              </body>
            </html>
          `);
          
          // Ensure the new document is fully loaded before triggering print
          newWindow.document.close();
          newWindow.focus();
      
          // Trigger the print dialog
          newWindow.print();
      
          // Close the new window after printing
          newWindow.close();
          }
          const btn = document.getElementById("printbtn");
          if (btn) {
            btn.style.display = 'none';
          }
        } else {
          console.error('Print area not found');
        }
      };
      

    return (
        <div className='p-3 flex flex-col' id='printarea'>
            <div className='p-2'>
                <div className='flex flex-row gap-x-2 items-center place-content-between'>
                    <div><h3>{ssrdata?.selling_plots?.estate}</h3></div>
                    <div><button className='btn btn-sm btn-ghost' id='printbtn' onClick={printbtn}><FiPrinter /> Print</button></div>
                </div>
                <p className='p-2 text-gray-600'>Initial Payment {moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.initial_payment}`)} </p>
                <p className='p-2 text-slate-600 '>Soldout Price {moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.selling_price}`)} </p>
                <p className='p-2 text-red-500'>Total Price {moneyFormat({country:'en-NG', currency:'NGN'}).format(`${ssrdata?.acume}`)} </p>
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
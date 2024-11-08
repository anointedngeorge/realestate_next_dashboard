"use client"
import CustomTable from '@/components/customTable'
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCustomSSR } from '@/app/custom_hooks'
import { APIBASEURl } from '@/app/interface'


const Token = globalThis?.sessionStorage?.getItem("apptoken")

const UpdatePayment = (prop:{client_id?:string, estate_id?:string}) => {

  const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/sale/property/balances/${prop.estate_id}/${prop.client_id}/`, headers:{
    "Authorization":`Bearer ${Token}`
  }});


   return (
        <div className='overflow-auto'>
            <CustomTable 
                is_searchable={true}
                thead={[
                  'plots',
                  'Sold Price',
                  'initial_payment',
                  'Remaining Balance',
                  'discount',
                  'Total Plots',
                  'land use',
                  'plot size',
                ]}
                tbody={ssrdata}
                mapper={['plots','selling_price','initial_payment','remaining_balance','discount','number_plots','land_use','plot_size']}
                placeholder_values={{'$id':"data.id"}}
                actions={[
                  {link:`${APIBASEURl}/sale/updateclientbalance/$id/${prop.estate_id}/${prop.client_id}`, name:'Update Balance', id:"$id", 
                   onclick(event:React.MouseEvent<HTMLAreaElement>) {
                        event.preventDefault();
                        const href = event.currentTarget.href;
                        const amount = prompt("Enter Amount", '0.00');
                        const url = `${href}/${amount}/`;

                        if ((typeof amount == 'number') && (parseFloat(amount) > 0)) {
                            alert(`Amount can not be ${amount}`)
                            return
                        }

                        const ft = fetch(url, {
                            method:'put',
                            headers:{
                              'Authorization':`Bearer ${Token}`,
                            }
                        });
                        
                        ft.then(async (data) => {
                          const res = await data.json();
                          alert(res['message']);
                        })
                        
                        
                  },},

                  {
                    link:`/admin/property/histories/receipt?sale_id=$id&estate_id=${prop.estate_id}&&client_id=${prop.client_id}`, name:'Print Receipt' 
                  }
                ]}
              />
        </div>
   )
}


const HistoryPage = () => {
    const query = useSearchParams();
    const client_id = query.get('client_id');
    const estate_id = query.get("id"); // estate id

      // const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/sale/property/balances/${estate_id}/${client_id}/`, headers:{
      //   "Authorization":`Bearer ${Token}`
      // }});

    return (
        <div className='flex flex-col'>
            <div className='text-3xl font-black'>
                Payment Histories
            </div>
            <div className='p-3'>
              <div>
                  <h3>List of Plot Purchased</h3>
                  <UpdatePayment client_id={`${client_id}`} estate_id={`${estate_id}`}  />
              </div>
        
            </div>
        </div>
    )
}



const Home = () => {
  return (
    <Suspense>
        <HistoryPage />
    </Suspense>
  )
}

export default Home

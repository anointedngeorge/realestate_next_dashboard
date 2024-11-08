"use client"
import Chartjs from '@/components/admin/Chartjs'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import React, {  useEffect, useState } from 'react'
import { FaUserGroup } from "react-icons/fa6";
import { TbBuildingEstate } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";
import { FcDebt } from "react-icons/fc";
import { useCustomSSR } from '../custom_hooks'
import { externalurls } from '../interface'
import { IconType } from 'react-icons'
import { MdAccountBalance } from "react-icons/md";
import { moneyFormat } from '../utils/utils'



const GridCardInner = (prop:{title?:string, value?:string, Icon?:IconType}) => {
    return (
        <div className="drop-shadow-sm min-h-32 even:bg-slate-700 odd:bg-slate-600 bg-opacity-85 text-white border-2 rounded-lg flex flex-col py-2 px-3">
            <div className="w-full flex flex-row place-content-between">
                    <div></div>
                    <div>
                        {prop.Icon ? <prop.Icon size={30} /> : ''}
                    </div>
            </div>
            <div className="w-full flex flex-row place-content-between items-center">
                <div className='text-lg drop-shadow-sm font-bold text-yellow-400 shrink-0'>{prop.value}</div>
                <div className='font-bold shrink-0 text-xs'> {prop.title}</div>
            </div>
        </div>
    )
}

interface SummaryListInterface {
    client:string,
    realtor:string,
    sale:string,
    total_amount_sales: number | bigint | string | undefined;
    sales_unpaid_amount: number | bigint | string | undefined;
    unpaid:string,
    paid:string,
    property:string
}




const GridCard = () => {
    const [summarylist, setSummaryList] = useState<SummaryListInterface>()
    const {ssrdata} = useCustomSSR({url:`${externalurls.summary}`, headers:{}});

    useEffect( () => {
        setSummaryList(ssrdata);
    }, [ssrdata] )

    return (
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-2 ">
            <GridCardInner Icon={FaUserGroup} value={summarylist?.client} title={'Total Clients'} />
            <GridCardInner Icon={FaUserGroup} value={summarylist?.realtor} title={'Total Realtors'} />
            <GridCardInner Icon={FcSalesPerformance} value={summarylist?.sale} title={'Total Plots Sold'} />
            <GridCardInner Icon={MdAccountBalance} value={moneyFormat({country:'en-NG', currency:'NGN'}).format(`${summarylist?.total_amount_sales}`)} title={'Total Sales Amount'} />
            <GridCardInner Icon={MdAccountBalance} value={moneyFormat({country:'en-NG', currency:'NGN'}).format(`${summarylist?.sales_unpaid_amount}`)} title={'Total Client Debt'} />
            <GridCardInner Icon={FcDebt} value={summarylist?.unpaid} title={'Total Unpaid Commission'} />
            <GridCardInner Icon={FcPaid} value={summarylist?.paid} title={'Total Paid Commission'} />
            <GridCardInner Icon={TbBuildingEstate} value={summarylist?.property} title={'Total Property'} />
        </div>
    )
}




const Home = () => {
    // const context = useContext(ThemeContext)

  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4'>
            <div>
                <LineTitle heading={`Dashboard  `}  />
                {/* {JSON.stringify(context)} */}
            </div>
            <div className='flex flex-col space-y-3'>
                <GridCard />
                <div className='mb-32'>
                    <Chartjs />
                </div>
                <div>
                    {/* <Datatable head={['Name', 'Index', 'your']} tbody={[
                        ['right', 'right1','right4']
                    ]} /> */}
                </div>
            </div>
        </main>

    </AdminLayout>
  )
}

export default Home

"use client"
import Chartjs from '@/components/admin/Chartjs'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import React, { useEffect, useState } from 'react'
import { FaMoneyCheckDollar, FaUserGroup } from "react-icons/fa6";
import { TbBuildingEstate } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";
import { FcDebt } from "react-icons/fc";
import { useCustomSSR } from '../custom_hooks'
import { externalurls } from '../interface'
import { IconType } from 'react-icons'




const GridCardInner = (prop:{title?:any, value?:string, Icon?:IconType}) => {
    return (
        <div className="drop-shadow-sm min-h-32 even:bg-slate-700 odd:bg-slate-600 bg-opacity-85 text-white border-2 rounded-lg flex flex-col py-2 px-3">
            <div className="w-full flex flex-row place-content-between">
                    <div></div>
                    <div>
                        {prop.Icon ? <prop.Icon size={30} /> : ''}
                    </div>
            </div>
            <div className="w-full flex flex-row place-content-between items-center">
                <div className='text-lg drop-shadow-sm font-bold text-red-500 shrink-0'>{prop.value}</div>
                <div className='font-bold shrink-0'> {prop.title}</div>
            </div>
        </div>
    )
}

const GridCard = () => {
    const [summarylist, setSummaryList] = useState<any>()
    const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.summary}`, headers:{}});

    useEffect( () => {
        setSummaryList(ssrdata);
    }, [ssrdata] )

    return (
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-2 ">
            <GridCardInner Icon={FaUserGroup} value={summarylist?.client} title={'Total Clients'} />
            <GridCardInner Icon={FaUserGroup} value={summarylist?.realtor} title={'Total Realtors'} />
            <GridCardInner Icon={FcSalesPerformance} value={summarylist?.sale} title={'Total Sales'} />
            <GridCardInner Icon={FcDebt} value={summarylist?.unpaid} title={'Total Unpaid'} />
            <GridCardInner Icon={FcPaid} value={summarylist?.paid} title={'Total Paid'} />
            <GridCardInner Icon={TbBuildingEstate} value={summarylist?.property} title={'Total Property'} />
        </div>
    )
}




const Home = () => {
  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4'>
            <div>
                <LineTitle heading={'Dashboard'}  />
            </div>
            <div className='flex flex-col space-y-3'>
                <GridCard />
                <div>
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

"use client"
import Chartjs from '@/components/admin/Chartjs'
import Datatable from '@/components/admin/Datatable'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import React from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";



const GridCardInner = () => {
    return (
        <div className="border-4 min-h-32 bg-red-50 rounded-lg flex flex-col py-2 px-3">
            <div className="w-full flex flex-row place-content-between">
                    <div></div>
                    <div>
                        <FaMoneyCheckDollar size={30} />
                    </div>
            </div>
            <div className="w-full flex flex-row place-content-between">
                <div className='text-3xl font-bold'>N34000</div>
                <div> Propterties</div>
            </div>
        </div>
    )
}

const GridCard = () => {
    return (
        <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-2 ">
            {[1,2,4,5].map((item, index) => (
                <GridCardInner key={`innerCard_${index}`} />
            ))}
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

"use client"
import Chartjs from '@/components/admin/Chartjs'
import Datatable from '@/components/admin/Datatable'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import React from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";



const Home = () => {
  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4'>
            <div>
                <LineTitle heading={'Dashboard'}  />
            </div>
            <div className='flex flex-col space-y-3'>
              
            </div>
        </main>

    </AdminLayout>
  )
}

export default Home

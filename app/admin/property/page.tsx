"use client"
import Chartjs from '@/components/admin/Chartjs'
import Datatable from '@/components/admin/Datatable'
import AdminLayout from '@/components/admin/Layout'
import { LineTitle } from '@/components/admin/LineTitle'
import CustomTable from '@/components/customTable'
import React from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";



const Home = () => {
  return (
    <AdminLayout >
        <main className='flex flex-col space-y-4'>
            <div>
                <LineTitle heading={'Property Listing'}  />
            </div>
            <div className='flex flex-col space-y-3'>
                <div>navigations</div>
                <div>
                    <CustomTable 
                        thead={['name', 'amount']}
                        tbody={[
                            {name:'Onovo', amount:'amount'}
                        ]}
                        mapper={['name','amount']}
                        actions={[
                            '/admin/$data.name/$data.amount'
                        ]}
                    />
                </div>
            </div>
        </main>

    </AdminLayout>
  )
}

export default Home

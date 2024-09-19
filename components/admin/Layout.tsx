import React from 'react'
import AsideBar from './AsideBar';
import TopMenu from './TopMenu';

const AdminLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='flex flex-row'>
            <div className='w-1/5 max-sm:hidden shrink-0 bg-black text-white p-3'> 
                <AsideBar />
             </div>
            <div className='w-4/5 shrink-0 max-sm:w-full flex flex-col space-y-10'>
                <div>
                    <TopMenu />
                </div>
                <div className='bg-slate-50 p-3 rounded-sm'>
                    {children}
                </div>
            </div>
    </div>
  )
}

export default AdminLayout

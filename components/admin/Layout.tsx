"use client"
import React, { useCallback, useContext, useState, useEffect } from 'react';

import AsideBar from './AsideBar';
import TopMenu from './TopMenu';


import { ThemeContext } from '@/app/interface';





const Token = globalThis?.sessionStorage?.getItem("apptoken")

const AdminLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [sidebarToggle, setSidebarToggle] = useState<boolean>(true)

    const sideBarToggle =  useCallback(() => {
        if (sidebarToggle) {
          setSidebarToggle(false)
        } else {
          setSidebarToggle(true)
        }
    }, [sidebarToggle])

  
    
  return (
    <ThemeContext.Provider value={{token:Token}}>
        <div className='flex flex-row min-h-screen'>
                <div className={sidebarToggle? "w-1/5 max-sm:hidden shrink-0 bg-black text-white p-3": "w-1/5 hidden max-sm:hidden shrink-0 bg-black text-white p-3"}> 
                    <AsideBar />
                </div>
                <div className={sidebarToggle? 'w-4/5 shrink-0 max-sm:w-full flex flex-col space-y-10' : 'w-full shrink-0 max-sm:w-full flex flex-col space-y-10'}>
                    <div>
                        <TopMenu toggle={sideBarToggle} />
                    </div>
                    <div className='p-3'>
                        <div className='bg-gray-50 p-3 rounded-sm'>
                            {children}
                        </div>
                    </div>
                </div>
        </div>
    </ThemeContext.Provider>
  )
}

export default AdminLayout

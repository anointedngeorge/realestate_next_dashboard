"use client"
import React, { useCallback, useState, useEffect } from 'react';

import AsideBar from './AsideBar';
import TopMenu from './TopMenu';


import { APIBASEURl, ThemeContext } from '@/app/interface';
import { useCustomSSR } from '@/app/custom_hooks';





const Token = globalThis?.sessionStorage?.getItem("apptoken")

const AdminLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [sidebarToggle] = useState<boolean>(true)
    const [sidebarToggle2, setSidebarToggle2] = useState<boolean>(true)
    
    const [token, setToken] = useState('');
    const [settings, setSettings] = useState({});

    // const sideBarToggle =  useCallback(() => {
    //     if (sidebarToggle) {
    //       setSidebarToggle(false)
    //     } else {
    //       setSidebarToggle(true)
    //     }
    // }, [sidebarToggle])


    const sideBarToggleFun2 =  useCallback(() => {
 
      let tg:boolean;
      if(sidebarToggle2) {
          tg = false;
      } else {
        tg = true;
      }
      setSidebarToggle2(tg)
  }, [sidebarToggle2])

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/control/settings/list/`, headers:{
      "Authorization":`Bearer ${Token} `
    }});


    useEffect(() => {
      const fetchedToken = `${Token}`;  
      const fetchedSettings = ssrdata;  
      setToken(fetchedToken);
      setSettings(fetchedSettings);
    }, [ssrdata]);

  
      if (Token && ssrdata) {
          return (
        <ThemeContext.Provider value={{token:`${token}`, settings:settings}}>
            <div className='flex flex-row min-h-screen'>
                  
                    <div className={sidebarToggle2? "w-1/5 max-sm:w-3/4 z-40 shrink-0 bg-slate-900 text-white p-3": "w-1/5 hidden max-sm:hidden shrink-0 bg-black text-white p-3"}> 
                        <AsideBar />
                    </div>
                    <div className={sidebarToggle? 'w-4/5 shrink-0 max-sm:w-full flex flex-col space-y-10' : 'w-full shrink-0 max-sm:w-full flex flex-col space-y-10'}>
                        <div>
                            <TopMenu toggle={sideBarToggleFun2} />
                        </div>
                      
                        <div className='bg-gray-50 p-3 rounded-sm overflow-auto'>
                            {children}
                        </div>
                        
                    </div>
            </div>
        </ThemeContext.Provider>
      ) 
    } else {
        return <div>Loading...</div>
    }
}

export default AdminLayout

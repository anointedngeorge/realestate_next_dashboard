"use client"
import React from 'react';

// import { ThemeContext } from '@/app/interface';
import Navbar from './Navbar';
import CustomFooter from './Footer';





// const Token = globalThis?.sessionStorage?.getItem("apptoken")

const FrontendLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    // const [sidebarToggle, setSidebarToggle] = useState<boolean>(true)

    // const sideBarToggle =  useCallback(() => {
    //     if (sidebarToggle) {
    //       setSidebarToggle(false)
    //     } else {
    //       setSidebarToggle(true)
    //     }
    // }, [sidebarToggle])

  
    
  return (
    <>
      <Navbar />
        {children}
      <CustomFooter />
    </>
  )
}

export default FrontendLayout

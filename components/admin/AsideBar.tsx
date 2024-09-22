"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaTachometerAlt } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa6";
import { externalurls, ThemeContext } from '@/app/interface';
import { useCustomSSR } from '@/app/custom_hooks';

interface MenuList {
    title?:string,
    link?:string,
    has_dropdown?:boolean,
    Icon?:IconType,
    list?: {title:string, link:string}[]
}

const MenuList:React.FC<MenuList> = (prop) => {
    const [toggleState, setToggleState] = useState<boolean>(false)


    const toggleMenu = useCallback(() => {
        if (toggleState) {
            setToggleState(false)
        } else {
            setToggleState(true)
        }
    }, [toggleState])


  return (
      <div className="flex flex-col">
          <div 
                onClick={prop.has_dropdown? toggleMenu : undefined } 
                className='flex flex-row items-center space-x-2 text-lg font-bold cursor-pointer hover:text-red-100'
            >
              <div>
                {prop.Icon? <prop.Icon />: ''}
              </div>
              <div>
                   {prop.has_dropdown? prop.title : (<Link href={`${prop.link}`}>{prop.title}</Link>)}
              </div>
          </div>

          <div className={toggleState? 'animate-in mt-3' : 'hidden'} >
              <ul className='bg-gray-50 bg-opacity-25 rounded-md text-white p-2'>
                  {prop?.list?.map((item, index) => (
                        <li key={`keylist_${index}`} className='ml-4'>
                            <Link href={`${item?.link}`} className='border-none hover:text-red-200' >
                                <div className="flex flex-row items-center space-x-2">
                                    <div><FaDotCircle size={4} /></div>
                                    <div>{item?.title}</div>
                                </div>
                            </Link>
                        </li>
                  ))}
              </ul>
          </div>
      </div>
  )
}


const AsideBar = () => {
    const [profiledata, setProfileData] = useState<any>();
    const context = useContext(ThemeContext)
    const {ssrdata, ssrerror, ssrstatus} = useCustomSSR({url:`${externalurls.profile}`, headers:{
        "Authorization":`Bearer ${context?.token} `
      }});

    useEffect(() => {
        setProfileData(ssrdata)
    }, [ssrdata])

  return (
    <div >
        <div className="flex flex-col space-y-10 p-3">
                <div className='flex flex-col space-y-2 place-content-center items-center'>
                        <div>
                            <Image 
                                className='rounded-full border-4' 
                                src={`https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`} 
                                alt='' width={100} height={100}
                             />
                        </div>
                        <div className='font-bold text-red-500'>{profiledata? profiledata?.email: '....'}</div>
                </div>
                <div className='flex flex-col space-y-8'>
                    <MenuList 
                        title='Home' 
                        Icon={FaTachometerAlt}
                        has_dropdown={false}
                        link={`${process.env.NEXT_PUBLIC_ADMIN}/`}
                    />
                    <MenuList 
                        title='Property' 
                        Icon={FaSitemap}
                        has_dropdown={true}
                        list={[
                            {title:'Add Property', link:`${process.env.NEXT_PUBLIC_ADMIN}/addproperty/`},
                            {title:'List Property', link:`${process.env.NEXT_PUBLIC_ADMIN}/property/`}
                        ]}
                    />
                </div>
        </div>
    </div>
  )
}

export default AsideBar

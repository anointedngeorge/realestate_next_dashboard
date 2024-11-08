"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaTachometerAlt } from "react-icons/fa";
import { APIBASEURl, externalurls, ThemeContext } from '@/app/interface';
import { useCustomSSR } from '@/app/custom_hooks';
import { FaUsers } from "react-icons/fa";
import { FaUsers as fausers } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { usePathname } from 'next/navigation';

interface MenuList {
    title?:string,
    link?:string,
    has_dropdown?:boolean,
    Icon?:IconType,
    path?:string,
    list?: {title:string, link:string}[]
}

const MenuList:React.FC<MenuList> = (prop) => {
    const [toggleState, setToggleState] = useState<boolean>(false)
    const currentPath = usePathname();
    
    const toggleMenu = useCallback(() => {
        if (toggleState) {
            setToggleState(false)
        } else {
            setToggleState(true)
        }
    }, [toggleState])


  return (
      <div className={currentPath.endsWith(`${prop.path}`) ? `text-yellow-300 flex flex-col`: 'flex flex-col'}>
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
                        <li key={`keylist_${index}`} className='ml-4 mt-2 bg-slate-100 p-2 text-black rounded'>
                            <Link href={`${item?.link}`} className='border-none hover:text-red-400' >
                                <div className="flex flex-row items-center space-x-2">
                                    <div><FaDotCircle size={4} /></div>
                                    <div>{item?.title} </div>
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
    const [profiledata, setProfileData] = useState<Record<string, string>>();
    const context = useContext(ThemeContext)

    const {ssrdata} = useCustomSSR({url:`${APIBASEURl}/auth/`, headers:{
        "Authorization":`Bearer ${context?.token} `
      }});

    //   console.log(`${APIBASEURl}/auth/`);
      

      const [propertylist, setPropertyList] = useState<{title:string, link:string}[]>();
      
      const {ssrdata:propertyssrdata} = useCustomSSR({url:`${externalurls.propertylist}`, headers:{
          "Authorization":`Bearer ${context?.token} `
        }});


    useEffect(() => {
        const container: { title: string; link: string; }[] = [];
        
        container.push({ title:"New Property", link:`${process.env.NEXT_PUBLIC_ADMIN}/property/addproperty` });

        propertyssrdata?.map((item:{estate:string, id:string}) => {

            container.push({ title:item?.estate, link:`${process.env.NEXT_PUBLIC_ADMIN}/property/?id=${item.id}` });
        })

        setPropertyList(container)
    }, [propertyssrdata])

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
                                src={`/logo/logo.png`} 
                                alt='' width={70} height={70}
                             />
                        </div>
                        <div className='font-bold text-red-100 text-xs'>{profiledata? profiledata?.email: '....'}</div>
                </div>
                <div className='flex flex-col space-y-8'>
                    <MenuList
                        path='/admin'
                        title='Home' 
                        Icon={FaTachometerAlt}
                        has_dropdown={false}
                        link={`${process.env.NEXT_PUBLIC_ADMIN}/`}
                    />
                    <MenuList
                        path='realtors'
                        title='Realtors' 
                        Icon={FaUsers}
                        has_dropdown={false}
                        link={`${process.env.NEXT_PUBLIC_ADMIN}/realtors/`}
                    />
                    <MenuList
                        path='clients'
                        title='Clients' 
                        Icon={fausers}
                        has_dropdown={false}
                        link={`${process.env.NEXT_PUBLIC_ADMIN}/clients/`}
                    />
                    <MenuList
                        path='property'
                        title='Estates'
                        Icon={MdOutlineRealEstateAgent}
                        has_dropdown={true}
                        list={propertylist}
                    />

                    <MenuList
                        path='commission/paid'
                        title='Commission' 
                        Icon={FaMoneyCheckAlt}
                        has_dropdown={true}
                        list={[
                            {title:'Paid', link:`${process.env.NEXT_PUBLIC_ADMIN}/commission/paid/`},
                            {title:'UnPaid', link:`${process.env.NEXT_PUBLIC_ADMIN}/commission/unpaid/`}
                        ]}
                    />
                </div>
        </div>
    </div>
  )
}

export default AsideBar

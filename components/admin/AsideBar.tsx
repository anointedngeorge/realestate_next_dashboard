"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const MenuList = () => {
  return (
      <div className="flex flex-col">
          <div className='flex flex-row items-center space-x-1'>
              <div>Icon</div>
              <div>Title</div>
          </div>
          <div>
              <ul>
                  <li><Link href={`h`}>item One</Link></li>
              </ul>
          </div>
      </div>
  )
}


const AsideBar = () => {
  return (
    <div >
        <div className="flex flex-col space-y-10 p-3">
                <div className='flex flex-col space-y-2 place-content-center items-center'>
                        <div>
                            <Image className='rounded-full border-4' src={`https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`} alt='' width={100} height={100} />
                        </div>
                        <div className='font-bold text-red-500'>Admin Controller</div>
                </div>
                <div>
                    <MenuList />
                </div>
        </div>
    </div>
  )
}

export default AsideBar

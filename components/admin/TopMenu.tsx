import Link from 'next/link';
import React from 'react'
import { IconType } from "react-icons";
import { BiArrowBack } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Image from 'next/image';



interface TopmentInterface {
    toggle?: () => void
}



const Ulist = (prop:{
        Icon:IconType, 
        url?:string, 
        title?:string,
        onclick?: React.MouseEventHandler<HTMLAnchorElement>
    }) => {
  return (
    <Link onClick={prop.onclick} href={`${prop.url}`}>
        <div className='flex items-center space-x-1'>
            <div><prop.Icon /></div>
            <div>{prop.title}</div>
        </div>
    </Link>
  )
}



const Profile = () => {
  const logout = (event:React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (confirm("Are You Sure?")) {
        globalThis?.sessionStorage?.removeItem("apptoken");
        globalThis.location.href = '/'
    }
  }
  return (
    <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <Image
          width={100}
          height={100}
          alt="..."
          src="/images/person_avata.jpeg" />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
          <Ulist Icon={FaUser} title='Profile' url='/admin' />
      </li>
      <li>
          <Ulist Icon={IoSettings} title='Settings' url='/admin/settings' />
      </li>
      <li><Ulist onclick={logout} Icon={FaPowerOff} title='Logout'  /></li>
    </ul>
  </div>
  )
}


// const SearchBar = () => {
//   return (
//       <div className="flex flex-row items-center rounded-full border-4 p-2">
//           <div >
//             <input 
//                   type="search" 
//                   placeholder='Search...' 
//                   className='w-80 p-2 outline-none border-none rounded-full text-black'

//             />
//           </div>
//           <div>
//               <FiSearch size={30} />
//           </div>
//       </div>
//   )
// }


const TopMenu:React.FC<TopmentInterface> = (prop) => {
  return (
    <div className='flex px-3 py-2 flex-row place-content-between items-center'>
        <div >
          <span onClick={prop.toggle}  className='cursor-pointer'>
            <BiArrowBack size={20} />
          </span>
        </div>
        {/* <div >
            <SearchBar />
        </div> */}
        <div >
          <Profile />
        </div>
    </div>
  )
}

export default TopMenu

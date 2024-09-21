import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";



interface TopmentInterface {
    toggle?: () => void
}



const Profile = () => {
  return (
    <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div>
  )
}


const SearchBar = () => {
  return (
      <div className="flex flex-row items-center rounded-full border-4 p-2">
          <div >
            <input 
                  type="search" 
                  placeholder='Search...' 
                  className='w-80 p-2 outline-none border-none rounded-full text-black'

            />
          </div>
          <div>
              <FiSearch size={30} />
          </div>
      </div>
  )
}


const TopMenu:React.FC<TopmentInterface> = (prop) => {
  return (
    <div className='flex px-3 py-2 flex-row place-content-between items-center'>
        <div >
          <span onClick={prop.toggle}  className='cursor-pointer'>
            <BiArrowBack size={20} />
          </span>
        </div>
        <div >
            <SearchBar />
        </div>
        <div >
          <Profile />
        </div>
    </div>
  )
}

export default TopMenu

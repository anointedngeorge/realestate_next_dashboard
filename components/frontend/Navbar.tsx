import Link from 'next/link'
import React from 'react'

const Dropdown = () => {
  return (
        <li>
            <details>
              <summary>Estates</summary>
              <div className='w-96 border-4 z-40'>
                  <ul>
                    <li>sddssa</li>
                    <li>asdf</li>
                    <li>sd</li>
                  </ul>
              </div>
            </details>
        </li>
    )
  }



const Navbar = () => {
  return (
    <div className="navbar bg-slate-950">
        <div className="flex-1">
          <Link href={''} className="btn btn-ghost text-xl text-white">
            Logo
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-slate-100 font-bold">
            <li><Link href={''}>Home</Link></li>
            <li><Link href={''}>About us</Link></li>
            <li><Link href={''}>Contact</Link></li>
            <Dropdown />
          </ul>
        </div>
    </div>
  )
}

export default Navbar

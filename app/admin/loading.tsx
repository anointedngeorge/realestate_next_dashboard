import Image from 'next/image'
import React from 'react'



const loading = () => {
  return (
    <div className='flex flex-col place-content-center items-center  min-h-screen bg-black bg-opacity-50'>
        <div>
          <Image className='rounded-full border-4 animate-spin' src={`https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`} alt='' width={50} height={50} />
        </div>
    </div>
  )
}

export default loading

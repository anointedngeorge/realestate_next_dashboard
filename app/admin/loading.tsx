import Image from 'next/image'
import React from 'react'



const loading = () => {
  return (
    <div className='flex flex-col place-content-center items-center  min-h-screen bg-slate-200 bg-opacity-50'>
        <div>
          <Image className='rounded-full animate-spin' src={`/logo/logo.png`} alt='' width={50} height={50} />
        </div>
    </div>
  )
}

export default loading

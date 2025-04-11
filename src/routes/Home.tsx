import React from 'react'
import { Button } from '@nextui-org/react'

export default function Home() {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#07c8f9]'>Outlier</span> Music <span className='text-[#09a6f3]'>Outlier</span> 🎧 <span className='text-[#0a85ed]'>Outlier</span>  🎧 <span className='text-[#0c63e7]'>Outlier</span>  🎧 <span className='text-[#0d41e1]'>Outlier</span></h1>
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#006ba6]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#ffbc42]'>Outlier</span>  🎧 <span className='text-[#d81159]'>Outlier</span>  🎧 <span className='text-[#8f2d56]'>Outlier</span></h1>
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#42BBFF]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#0274DB]'>Outlier</span>  🎧 <span className='text-[#0256B7]'>Outlier</span>  🎧 <span className='text-[#013D93]'>Outlier</span></h1>
      <Button color="danger">Button</Button>
    </main>
  )
}

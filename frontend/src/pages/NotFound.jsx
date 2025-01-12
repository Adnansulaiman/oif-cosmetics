import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";

const NotFound = () => {
  return (
    <div className=' w-screen h-screen flex flex-col justify-center items-center '>
        <h1 className='text-7xl font-black'>404</h1>
        <p className='text-3xl font-semibold mt-5'>Ooops,page not found :(</p>
        <Link to='/'><button className='flex gap-3 justify-center items-center text-xl font-semibold bg-black text-white mt-8 px-5 py-3 rounded-md hover:bg-transparent border-2 border-black hover:text-black'><BsArrowLeft className='text-3xl mt-1' />Back to Home</button></Link>
    </div>
  )
}

export default NotFound
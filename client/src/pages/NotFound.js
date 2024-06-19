import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className=' flex flex-col justify-center items-center m-0 p-0'>
            <div className='h-[30vh] w-full bg-white flex flex-col items-center relative m-0 p-0'>
                <h2 className='absolute text-slate-400 font-extrabold bottom-0 text-9xl -mb-3'>404</h2>
            </div>
            <div className='h-[70vh] w-full bg-slate-400 flex flex-col gap-3 items-center m-0 p-0' >
                <h1 className='text-white font-semibold text-5xl mt-20'>Sorry, Page Not Found</h1>
                <p className='text-white mt-6 text-lg'>The page you requested could not found</p>
                <Link to={"/"} className='text-primary text-white mt-4 w-36 h-12 flex justify-center items-center rounded-xl bg-black hover:underline hover:text-blue-500'>Go Back Home</Link>
            </div>
        </div>
    )
}

export default NotFound
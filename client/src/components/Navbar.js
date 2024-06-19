import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <div className='flex justify-between p-6 bg-slate-300'>
            <div className='ml-12'>
                <Link to={'/'}>
                    LOGO</Link>
            </div>
            <div>
                <ul className='flex gap-36 mr-20'>
                    <li><Link to={'/freatures'} className='hover:text-blue-900 hover:underline'>Features</Link></li>
                    <li><Link to={'/reviews'} className='hover:text-blue-900 hover:underline'>Reviews</Link></li>
                    <li><Link to={'/help'} className='hover:text-blue-900 hover:underline'>Help</Link></li>
                    <li> <Link to={'/register'} className='bg-red-300 p-3 px-7 rounded-3xl border-2 border-black hover:underline hover:bg-red-700'>Join us</Link> </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
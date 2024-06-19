import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div className='relative w-[100vw] h-[100vh]'>
            <div>
                <Navbar />
            </div>
            <div>
                HOme
            </div>
            <div className='absolute bottom-0 '>
                <Footer />
            </div>
        </div>
    )
}

export default Home
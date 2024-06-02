import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const CheckEmailPage = () => {

    const [data, setData] = useState({
        email: ""
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`
        try {
            const response = await axios.post(URL, data)
            console.log("response", response);
            toast.success(response.data.message)
            if (response.data.success) {
                setData({
                    email: ""
                })
                navigate('/password', {
                    state: response?.data
                })
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
        console.log(data);
    }
    return (
        <div className='mt-5 '>
            <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
                <div className='size-12 mx-auto mb-10'>
                    <FaRegUser className='bg-white border-black size-16' />
                </div>
                <h3 >Welcome to Chat app!</h3>
            </div>
            <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
                <form action="" onSubmit={handleSubmit}>

                    <div className='flex flex-col  bg-white p-2'>
                        <label htmlFor="email">Email : </label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Enter your email'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary rounded my-3'
                            value={data.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>


                    <div className='flex flex-col  bg-white p-2'>
                        <button className='bg-primary flex justify-center  p-2  hover:bg-secondary rounded text-white text-lg font-bold'>Login</button>
                    </div>
                </form>
                <p className='bg-white text-center  py-3 pb-4'>New User <Link to={"/register"} className='text-primary text-lg font-bold hover:underline hover:text-blue-950'>Register</Link></p>
            </div>
        </div>
    )
}


export default CheckEmailPage
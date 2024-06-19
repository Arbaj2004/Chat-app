import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

        const URL = `${process.env.REACT_APP_BACKEND_URL}/users/login`
        try {
            const response = await axios.post(URL, {
                email: data.email,
                password: data.password,
            }, {
                withCredentials: true
            }
            )
            console.log("response", response);
            toast.success(response.data.status)
            if (response.data.status === "success") {
                dispatch(setToken(response?.data?.token))
                localStorage.setItem('token', response?.data?.token)
                setData({
                    password: "",
                    email: ""
                })
                navigate('/message')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
        console.log(data);
    }
    return (
        <div className='flex flex-col justify-center items-center w-100vw h-100vh mt-40'>
            <div className='bg-slate-200 p-6 rounded-xl'>
                <div className='flex justify-center items-center flex-col '>
                    <div className='flex justify-center items-center p-2 text-white bg-purple-700 rounded-full'>
                        <FaRegUserCircle size={30} />
                    </div>
                    <div className=' text-2xl'>
                        <h2>Sign in</h2>
                    </div>
                </div>
                <form action="" className='flex flex-col justify-center item-center mt-3' onSubmit={handleSubmit}>

                    <div classname='w-12 bg-red-900'>
                        {/* <p className='font-semibold text-md'>Email</p> */}
                        <input type="email"
                            id='email'
                            name='email'
                            className=' mt-1 w-80 h-10 rounded mb-4 p-3'
                            placeholder='E-mail*'
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                    <div classname='w-12 bg-red-900'>
                        {/* <p className='font-semibold text-md'>Password</p> */}
                        <input type="password"
                            id='password'
                            name='password'
                            className=' mt-1 w-80 h-10 rounded mb-4 p-3'
                            placeholder='Password*'
                            required
                            onChange={handleOnChange}
                        />
                    </div>


                    <button className={`bg-purple-700 mt-5 text-white font-semibold rounded h-10 w-full hover:bg-blue-950`} >
                        Sign In
                    </button>
                </form>
                <p className=' text-center mt-2 mb-3'>Don't have an account? <Link to={"/register"} className='text-primary text-blue-700  hover:underline hover:text-blue-500'>Sign up</Link></p>

            </div >

        </div >
    )
}

export default Login
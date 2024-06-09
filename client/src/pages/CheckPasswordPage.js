//here i am saving token on redux state setToken
import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const CheckPasswordPage = () => {

    const [data, setData] = useState({
        password: "",
        userId: ""
    })

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    console.log("location", location);
    useEffect(() => {
        if (!location?.state?.data?.name) {
            navigate('/email')
        }
    }, [])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const user_id = location?.state?.data?._id;
    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`
        try {
            const response = await axios.post(URL, {
                userId: user_id,
                password: data.password,
            }, {
                withCredentials: true
            }
            )
            console.log("response", response);
            toast.success(response.data.message)


            if (response.data.success) {
                //storing redux states on localstorage
                dispatch(setToken(response?.data?.token))
                localStorage.setItem('token', response?.data?.token)
                setData({
                    password: "",
                    userId: ""
                })
                navigate('/')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
        console.log(data);
    }
    return (
        <div className='mt-5 '>
            <div className='bg-white w-full max-w-md  rounded overflow-hidden mx-auto'>
                <div className='w-60 h-36 mx-auto flex flex-col justify-center items-center'>
                    <Avatar
                        width={70}
                        height={70}
                        name={location?.state?.data?.name}
                        imageUrl={location?.state?.data?.profilePic}

                    />
                    <div>
                        <h2 className='mt-2 text-lg font-bold'>{location?.state?.data?.name}</h2>
                    </div>
                </div>
                <h3 >Welcome to Chat app!</h3>
            </div>
            <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
                <form action="" onSubmit={handleSubmit}>

                    <div className='flex flex-col  bg-white p-2'>
                        <label htmlFor="password">Password : </label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary rounded my-3'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>


                    <div className='flex flex-col  bg-white p-2'>
                        <button className='bg-primary flex justify-center  p-2  hover:bg-secondary rounded text-white text-lg font-bold'>Login</button>
                    </div>
                </form>
                <p className='bg-white text-center  py-3 pb-4'><Link to={"/forgot-password"} className='text-primary text-lg font-bold hover:underline hover:text-blue-950'>Forgot Password?</Link></p>
            </div>
        </div>
    )
}


export default CheckPasswordPage
import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import uploadFile from '../helper/UploadFiles';
import axios from 'axios'

const RegisterPage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profilePic: ""
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
    const [uploadPhoto, setUploadPhoto] = useState("")

    const handleUploadProfilePhoto = async (e) => {
        const file = e.target.files[0]

        const uploadPhoto = await uploadFile(file)
        console.log("😒😒😒😒uploadPhoto", uploadPhoto);

        setData((prev) => {
            return {
                ...prev,
                profilePic: uploadPhoto?.secure_url
            }
        })

        setUploadPhoto(file)
    }

    const handleClearUploadPhoto = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUploadPhoto(null)
    }
    console.log(uploadPhoto);
    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
        try {
            const response = await axios.post(URL, data)
            console.log("response", response);
            toast.success(response.data.message)
            if (response.data.success) {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    profilePic: ""
                })
                navigate('/email')
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
                <h3>Welcome to Chat app!</h3>
            </div>
            <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col  bg-white p-2'>
                        <label htmlFor="name">Name : </label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary rounded my-3'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
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
                        <label htmlFor="profilePic">profilePic :
                            <div className='bg-slate-200 p-5 flex justify-center hover:cursor-pointer border my-3 hover:border-primary rounded-lg'>
                                <p className='text-ellipsis max-w-80 line-clamp-1'>{uploadPhoto?.name ? uploadPhoto?.name : "upload the photo"}</p>
                                {
                                    uploadPhoto?.name && (
                                        <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                                            <IoCloseSharp />
                                        </button>
                                    )
                                }

                            </div>
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg image/jpg"
                            id='profilePic'
                            name='profilePic'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary rounded my-3 hidden'
                            onChange={handleUploadProfilePhoto}
                        />
                    </div>
                    <div className='flex flex-col  bg-white p-2'>
                        <button className='bg-primary flex justify-center  p-2  hover:bg-secondary rounded text-white text-lg font-bold'>Register</button>
                    </div>
                </form>
                <p className='bg-white text-center  py-3 pb-4'>Already have account ? <Link to={"/email"} className='text-primary text-lg font-bold hover:underline hover:text-blue-950'>Login</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage
import React, { useState } from 'react'
import { CiLock } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import uploadFile from '../helper/UploadFiles'

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
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
    const [loading, setLoading] = useState(false);
    const handleUploadProfilePhoto = async (e) => {
        const file = e.target.files[0];
        setLoading(true)
        console.log(`😒😒😒😒😒😒${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
        console.log("😒😒😒😒uploadPh");
        const uploadPhoto = await uploadFile(file)
        console.log("😒😒😒😒uploadPhoto", uploadPhoto.secure_url);
        setLoading(false)

        setData((prev) => {
            return {
                ...prev,
                profilePic: uploadPhoto?.secure_url
            }
        })

        setUploadPhoto(file)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const URL = `${process.env.REACT_APP_BACKEND_URL}/users/signup`
        try {
            const response = await axios.post(URL, data)
            console.log("data", data);
            console.log("response", response);
            console.log(response.data.status);
            toast.success("new user created")
            if (response.data.status === "success") {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    profilePic: ""
                })
                navigate('/login')
            }
        } catch (error) {
            toast.error("error to register")
            console.log(error);
        }
        console.log(data);
    }

    return (
        <div className='flex flex-col justify-center items-center w-100vw h-100vh mt-20'>
            <div className='bg-slate-200 p-6 rounded-xl'>
                <div className='flex justify-center items-center flex-col '>
                    <div className='flex justify-center items-center p-2 text-white bg-purple-700 rounded-full'>
                        <CiLock size={30} />
                    </div>
                    <div className=' text-2xl'>
                        <h2>Sign Up</h2>
                    </div>
                </div>
                <form action="" className='flex flex-col justify-center item-center mt-3' onSubmit={handleSubmit}>
                    <div classname='w-12 bg-red-900 h-12'>
                        {/* <p className='font-semibold text-md'>Name</p> */}
                        <input type="text"
                            className=' mt-1 w-80 h-10 rounded mb-4 p-3'
                            id='name'
                            name='name'
                            placeholder='Name*'
                            required
                            onChange={handleOnChange}
                        />
                    </div>
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
                    <div classname='w-12 bg-red-900'>
                        {/* <p className='font-semibold text-md'>Confirm Password</p> */}
                        <input type="password"
                            id='passwordConfirm'
                            name='passwordConfirm'
                            className=' mt-1 w-80 h-10 rounded mb-4 p-3'
                            placeholder='Confirm Password*'
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className={` ${loading ? " cursor-wait" : "bg-slate-200"} flex flex-col border-dashed border-2 border-sky-500 rounded`}>
                        <label htmlFor="profilePic">
                            <div className={`bg-blue-200 flex justify-center items-center flex-col hover:cursor-pointer border p-3 hover:border-primary rounded-lg ${loading ? "hidden" : "cursor-pointer"}`}>
                                <CiImageOn size={20} />
                                <p className='text-ellipsis max-w-80 line-clamp-1'>{uploadPhoto?.name ? uploadPhoto?.name : "upload the photo"}</p>
                            </div>

                            <div className={`bg-blue-200 flex justify-center items-center flex-col  border p-3 hover:border-primary rounded-lg ${loading ? " cursor-wait" : "hidden"}`}>
                                <Loading />
                                <p className='text-ellipsis max-w-80 line-clamp-1'>Uploading....</p>
                            </div>

                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg image/jpg"
                            id='profilePic'
                            name='profilePic'
                            className={`bg-slate-100 px-2 py-1 focus:outline-primary rounded my-3 hidden`}
                            disabled={loading ? true : false}

                            onChange={handleUploadProfilePhoto}
                        />
                    </div>

                    <button className={`bg-purple-700 mt-5 text-white font-semibold rounded h-10 w-full hover:bg-blue-950 ${loading ? " cursor-not-allowed hover:bg-purple-700 opacity-15 " : "bg-purple-700"}`} disabled={loading ? true : false}>
                        Register
                    </button>
                </form>
                <p className=' text-center mt-2 mb-3'>Already have an account? <Link to={"/login"} className='text-primary text-blue-700  hover:underline hover:text-blue-500'>Sign in</Link></p>
            </div >

        </div >
    )
}

export default Register
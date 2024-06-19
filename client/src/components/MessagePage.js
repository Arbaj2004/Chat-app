import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { IoIosVideocam } from "react-icons/io";
import uploadFile from '../helper/UploadFiles';
import { RxCross1 } from "react-icons/rx";
import Loading from './Loading';
import backgroundImg from '../assets/msg_background.png'
import { IoMdSend } from "react-icons/io";
import moment from 'moment'
import axios from 'axios';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';


const MessagePage = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log();
        const validate_user = async () => {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/validateUser`
            try {
                const response = await axios.post(URL, {
                    userId: params?.userId
                })
                console.log("❤️❤️❤️❤️response", response);
                toast.success(response.data.message)

            } catch (error) {
                console.log("👌👌👌👌❤️‍🔥", error);
                navigate('/page/not_found')
            }

        };
        validate_user()
    }, [])



    const socketConnection = useSelector(state => state?.user.socketConnection)
    // console.log("socketConnection", socketConnection);
    const user = useSelector(state => state?.user)
    const [datauser, setDatauser] = useState({
        name: "",
        email: "",
        profilePic: "",
        _id: "",
        online: false
    })

    const [allMessages, setAllMessages] = useState([])
    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('message-page', params.userId)

            socketConnection.emit('seen', params.userId)

            socketConnection.on('message-user', (data) => {
                setDatauser(data)
            })

            socketConnection.on('message', (data1) => {
                console.log('message data', data1)
                setAllMessages(data1)
            })
        }
    }, [socketConnection, params.userId, user])

    const currentMessage = useRef(null)
    useEffect(() => {
        if (currentMessage.current) {
            currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [allMessages])

    const [openImgVidUpload, setOpenImgVidUpload] = useState(false)
    const [meassage, setMeassage] = useState({
        text: "",
        imageUrl: "",
        videoUrl: ""
    })
    const handleEnterTextMsg = (e) => {
        console.log(meassage);
        setMeassage(prev => {
            return {
                ...prev,
                text: e?.target?.value
            }
        })
    }
    const [loading, setLoading] = useState(false)
    const handleOpenImgVidUpload = () => {
        setOpenImgVidUpload(prev => !prev)
    }
    const handleUploadImage = async (e) => {
        const file = e.target.files[0]
        setLoading(true)
        setOpenImgVidUpload(false)
        const uploadPhoto = await uploadFile(file)
        setLoading(false)
        console.log("😒😒😒😒uploadPhoto", uploadPhoto);
        setMeassage(prev => {
            return {
                ...prev,
                imageUrl: uploadPhoto?.secure_url
            }
        })
    }
    const handleClearUploadImg = async () => {
        setMeassage(prev => {
            return {
                ...prev,
                imageUrl: ""
            }
        })
    }
    const handleUploadVideo = async (e) => {
        const file = e.target.files[0]
        setLoading(true)
        setOpenImgVidUpload(false)
        const uploadVideo = await uploadFile(file)
        setLoading(false)
        console.log("😒😒😒😒uploadPhoto", uploadVideo);
        setMeassage(prev => {
            return {
                ...prev,
                videoUrl: uploadVideo?.secure_url
            }
        })
    }

    const handleClearUploadVid = async () => {
        setMeassage(prev => {
            return {
                ...prev,
                videoUrl: ""
            }
        })
    }
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (meassage.text || meassage.imageUrl || meassage.videoUrl) {
            if (socketConnection) {
                socketConnection.emit('new message', {
                    sender: user?._id,
                    receiver: params?.userId,
                    text: meassage?.text,
                    imageUrl: meassage?.imageUrl,
                    videoUrl: meassage?.videoUrl,

                })
            }
        }
        setMeassage(prev => {
            return {
                ...prev,
                text: "",
                imageUrl: "",
                videoUrl: ""
            }
        })

    }
    return (
        <div >
            {/* <Sidebar /> */}
            <header className='sticky top-0 h-16 bg-slate-200 flex justify-between  items-center px-4'>
                <div className='flex items-center gap-4'>
                    <div>
                        <Link to={'/'} >
                            <FaAngleLeft />
                        </Link>
                    </div>
                    <div>
                        <Avatar
                            width={50}
                            height={50}
                            name={datauser?.name}
                            imageUrl={datauser?.profilePic}
                            userId={datauser?._id}
                        />
                    </div>
                    <div>
                        <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{datauser?.name}</h3>
                        <p className='-my-2 text-sm'>
                            {
                                datauser.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>
                            }
                        </p>
                    </div>
                </div>
                <div >
                    <button className='cursor-pointer hover:text-primary'>
                        <BsThreeDotsVertical />
                    </button>
                </div>

            </header>
            {/* show all messages */}
            <section style={{ background: `url(${backgroundImg})` }} className={`h-[calc(100vh-128px)] overflow-x-hidden ${meassage?.imageUrl || meassage?.videoUrl || loading ? "overflow-y-hidden" : "overflow-y-auto"}  scrollbar relative bg-slate-200 bg-opacity-50`}>
                <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
                    {
                        allMessages.map((msg, index) => {
                            return (
                                <div className={` p-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-slate-200" : "bg-white"}`}>
                                    <div className='w-full relative'>
                                        {
                                            msg.imageUrl && (
                                                <div className='bg-slate-300 p-3 bg-opacity-45'>
                                                    <img
                                                        src={msg?.imageUrl}
                                                        alt="Uploaded_image"
                                                        className='aspect-auto w-80 h-80 object-scale-down' />
                                                </div>
                                            )
                                        }
                                        {
                                            msg.videoUrl && (
                                                <div className='bg-slate-300 p-3 bg-opacity-45'>
                                                    <video
                                                        src={msg.videoUrl}
                                                        className='w-full h-full object-scale-down'
                                                        controls
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <p className='px-2 whitespace-normal overflow-y-auto break-words'>{msg.text}</p>
                                    <p className=' text-xs text-slate-400 ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* upload image and vid display */}
                {
                    meassage?.imageUrl && (

                        <div className='w-full sticky bottom-0 h-full flex flex-col justify-center items-center rounded overflow-hidden bg-slate-700 bg-opacity-30'>
                            <div className='absolute cursor-pointer text-white font-extrabold right-5 top-20 hover:text-ld hover:font-bold hover:text-slate-200 w-12 h-12 hover:bg-slate-500 flex justify-center items-center rounded-full' onClick={handleClearUploadImg}>
                                <RxCross1 size={30} />
                            </div>
                            <div className='bg-white p-3 bg-opacity-45'>
                                <img
                                    src={meassage?.imageUrl}
                                    alt="Uploaded_image"
                                    className='aspect-auto w-80 h-80 object-scale-down' />
                            </div>
                        </div>
                    )
                }
                {
                    meassage?.videoUrl && (

                        <div className='w-full sticky bottom-0 h-full flex flex-col justify-center items-center rounded overflow-hidden bg-slate-700 bg-opacity-30'>
                            <div className='absolute cursor-pointer text-white font-extrabold right-5 top-20 hover:text-ld hover:font-bold hover:text-slate-200 w-12 h-12 hover:bg-slate-500 flex justify-center items-center rounded-full' onClick={handleClearUploadVid}>
                                <RxCross1 size={30} />
                            </div>
                            <div className='bg-white p-3 bg-opacity-45 '>
                                <video
                                    src={meassage?.videoUrl}
                                    className='aspect-auto w-96 object-scale-down'
                                    controls
                                />
                            </div>
                        </div>
                    )
                }
                {
                    loading && (
                        <div className='w-full sticky bottom-0 h-full flex flex-col justify-center items-center rounded overflow-hidden bg-slate-700 bg-opacity-30'>
                            <div className='absolute'>
                                <Loading width={12} />

                            </div>
                        </div>
                    )
                }
            </section>
            {/**send message */}
            {/* video and images */}
            <section className='h-16 bg-slate-200 flex items-center px-4'>
                <div className='relative'>
                    <button onClick={handleOpenImgVidUpload} className=' flex justify-center items-center hover:bg-primary rounded-full h-11 w-11'>
                        <FaPlus size={20} />
                    </button>
                    {
                        openImgVidUpload && (


                            < div className='bg-white shadow rounded absolute bottom-14 left-3 w-32'>
                                <form>
                                    <label htmlFor='uploadImg' className='flex  justify-center gap-3 items-center p-2 cursor-pointer hover:bg-slate-200 rounded m-2'>
                                        <div className='text-primary'>
                                            <FaRegImage />
                                        </div>
                                        <p>Image</p>
                                    </label>
                                    <label htmlFor='uploadVid' className='flex  justify-center gap-3 items-center p-2 cursor-pointer hover:bg-slate-200 rounded m-2'>
                                        <div className='text-primary'>
                                            <IoIosVideocam />
                                        </div>
                                        <p>Video</p>
                                    </label>
                                    <input
                                        type="file"
                                        id='uploadImg'
                                        onChange={handleUploadImage}
                                        className='hidden'
                                        accept="image/png, image/jpeg image/jpg"
                                    />
                                    <input
                                        type="file"
                                        id='uploadVid'
                                        onChange={handleUploadVideo}
                                        accept="video/mp4 "
                                        className='hidden'
                                    />
                                </form>
                            </div >
                        )}
                </div>
                {/* input box for text */}
                <div className='w-full h-full flex items-center '>
                    <form action="" className='w-full h-full flex items-center' onSubmit={handleSendMessage}>
                        <input type="text"
                            placeholder='Enter the Message....'
                            className='w-full h-4/6 shadow-md px-6 mr-12 ml-3 py-2 outline-none  rounded'
                            value={meassage.text}
                            onChange={handleEnterTextMsg} />
                        <button className='absolute right-0 mr-2 text-blue-900 hover:text-blue-600 w-12 h-12 hover:bg-slate-300 p-2 flex justify-center items-center rounded-full'>
                            <IoMdSend size={40} />
                        </button>
                    </form>
                </div>
            </section >

        </div >
    )
}

export default MessagePage
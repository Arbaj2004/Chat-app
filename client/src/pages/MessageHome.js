//over here i am calling user-details and info save it to the setUser() in redux

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setToken, setUser, setsocketConnection } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
// import logo from '../assets/logo.png'
import io from 'socket.io-client'

const Home = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const basePath = location?.pathname === '/';
    const token = localStorage.getItem('token')

    useEffect(() => {
        console.log("validating user here");
        const validate_user = async () => {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/users/logged`
            try {
                const response = await axios.get(URL, { headers: { 'authorization': `Bearer ${token}` } })
                console.log("❤️❤️❤️❤️response", response);

            } catch (error) {
                console.log("👌👌👌👌❤️‍🔥", error);
                navigate('/login')
            }

        }; validate_user()
    }, [])
    if (localStorage.token) {
        dispatch(setToken(localStorage.token))
    }
    const fetchUserDetails = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/users/user-details`
        try {
            const response = await axios.get(URL, { headers: { 'authorization': `Bearer ${token}` } })
            console.log(response.data.data);
            dispatch(setUser(response?.data?.data))
            if (response.data.logout) {
                dispatch(logout())
                navigate('/email')
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchUserDetails()
    }, [])

    // socket connection
    useEffect(() => {
        // console.log("token");
        const socketConnection = io(process.env.REACT_APP_BACKEND, {
            auth: {
                token: localStorage.getItem('token')
            }
        })
        console.log("data");
        socketConnection.on('onlineUsers', (data) => {
            console.log("data i sfdksjhkfhskjfh", data);
            dispatch(setOnlineUser(data))
        })
        dispatch(setsocketConnection(socketConnection))
        return () => {
            socketConnection.disconnect()
        }
    }, [])




    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
                <Sidebar />
            </section>
            {/**message component**/}
            <section className={`${basePath && "hidden"}`} >
                <Outlet />
            </section>

            <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
                <div>
                    {/* <img
                        src={logo}
                        width={250}
                        alt='logo'
                    /> */}
                    IMG
                </div>
                <p className='text-lg -mt-10 text-slate-500'>Select user to send message</p>
            </div>
        </div>
    )
}

export default Home
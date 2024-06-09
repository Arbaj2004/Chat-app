import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

const UserDetails = () => {
    const handleSub = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
        try {
            const response = await axios.get(URL, {
                withCredentials: true
            })
            // console.log;
            console.log("❤️❤️❤️❤️response", response);
            toast.success(response.data.message)

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={handleSub}>sub</button>
        </div>
    )
}

export default UserDetails
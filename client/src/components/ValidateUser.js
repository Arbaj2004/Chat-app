import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ValidateUser = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        console.log();
        const validate_user = async () => {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/validateUser`
            try {
                const response = await axios.post(URL, {
                    userId: useParams?.userId
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
    return (
        <div>ValidateUser{children}</div>
    )
}

export default ValidateUser
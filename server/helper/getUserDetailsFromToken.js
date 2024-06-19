//get user data email and userId from jwt tokendata
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {                    //no error as token not available simply logout no autherize
            message: "session out",
            logout: true
        }
    }
    //decode jwt and extract data 
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findById(decode.id).select("-password");

    return user
}

module.exports = getUserDetailsFromToken
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')

async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body
        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            return res.status(401).json({
                message: `Incorrect password ${error.message}`,
                error: true
            })
        }

        //creating jwt
        const tokenData = {
            id: user._id,
            email: user.email
            // password: password
        }
        //jwt.sign() : parameters: data/payload , secreatkey , expire in 
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const cookieOptions = {
            httpOnly: true
            // secure: true
        }

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: `Login successfully`,
            token: token,
            success: true
        })

    } catch (error) {
        return res.status(401).json({
            message: `Incorrect password ${error.message}`,
            error: true
        })
    }
}

module.exports = checkPassword
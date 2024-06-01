const { default: mongoose } = require("mongoose")
const UserModel = require("../models/UserModel")

async function checkEmail(req, res) {
    try {
        const { email } = req.body
        const checkEmail = await UserModel.findOne({ email }).select("-password")   //deselect the password

        if (!checkEmail) {
            return res.status(400).json({
                message: `user not exists`,
                error: true
            })
        }

        return res.status(200).json({
            message: "email verified",
            success: true,
            data: checkEmail     //do not contains password
        })

    } catch (error) {
        return res.status(500).json({
            message: `email does not exist plz register : ${error}`,
            error: true
        })
    }
}

module.exports = checkEmail
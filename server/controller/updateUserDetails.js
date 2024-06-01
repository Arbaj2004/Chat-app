const getUserDetailsFromToken = require("../helper/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserDetails(req, res) {
    try {
        const token = req.cookies.token || ""
        if (token === "") {
            return res.status(401).json({           //401 unauthorized
                message: `token invalid`
            })
        }

        const user = await getUserDetailsFromToken(token)
        //user can update profile_pic and email only
        const { name, profile_pic } = req.body
        const updateUser = await UserModel.updateOne({ _id: user._id }, {
            name,
            profile_pic
        })

        const updatedUserDetails = await UserModel.findById(user._id)

        return res.status(200).json({
            message: `user update successfully`,
            userdetails: updatedUserDetails,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: `error in update userDetails ${error}`,
            error: true
        })
    }
}

module.exports = updateUserDetails
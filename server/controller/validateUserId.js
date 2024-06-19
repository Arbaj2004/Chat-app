const UserModel = require("../models/UserModel")

async function validateUserId(req, res) {
    try {
        const user = await UserModel.findById(req.body.userId)
        if (user) {
            return res.status(200).json({
                message: "valid user",
                data: user,
                success: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "error to fetch user data " + error,
            error: true
        })
    }
}

module.exports = validateUserId
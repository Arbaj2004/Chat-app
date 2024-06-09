const getUserDetailsFromToken = require("../helper/getUserDetailsFromToken")

async function userDetails(req, res) {
    try {

        //get token from cookie
        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        if (!token) {
            return res.status(200).json({
                message: "kindly log in cookie is null",
                error: true
            })
        }

        return res.status(200).json({
            message: "user logged in",
            data: user,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "error to fetch user data " + error,
            error: true
        })
    }
}

module.exports = userDetails
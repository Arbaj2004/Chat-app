//we are authorized by token in cookie so for logout change cookie token to '' null string
async function logout(req, res) {
    try {
        const cookieOptions = {
            http: true,
            secure: true
        }

        return res.cookie('token', '', cookieOptions).status(200).json({
            message: `Session Out logout`,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: `user logout successfully ${error}`,
            error: true
        })
    }
}

module.exports = logout
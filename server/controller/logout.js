async function logout(req, res) {
    try {
        const cookieOptions = {
            httpOnly: true, // Ensure the cookie is only accessible by the web server
            secure: process.env.NODE_ENV === 'production', // Set secure flag for HTTPS only in production
            sameSite: 'strict', // Protect against CSRF
            expires: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),// Set expiration date to a past date to remove the cookie
            path: '/'
        };

        return res.cookie('token', '', cookieOptions).status(200).json({
            message: 'Session Out logout',
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: `user logout failed ${error}`,
            error: true
        });
    }
}

module.exports = logout;

const factory = require('./handlerFactory')
const User = require('../models/userModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');

exports.searchUser = catchAsync(async (req, res, next) => {
    try {
        const { search } = req.body
        // console.log(req.body);

        const query = new RegExp(search, "i", "g")

        const user = await User.find({
            "$or": [
                { name: query },
                { email: query }
            ]
        }).select("-password").select("-createdAt").select("-updatedAt").select("-__v")
        // console.log(user);

        return res.json({
            message: 'searched user',
            data: user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
    next();
})

exports.userDetails = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError('TOKEN IS NOT THERE', 401)
        );
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findById(decode.id).select("-password");

    return res.status(200).json({
        message: "user logged in",
        data: user,
        success: true
    })
})

exports.updateUserDetails = catchAsync(async (req, res, next) => {

    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(
                new AppError('TOKEN IS NOT THERE', 401)
            );
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findById(decode.id).select("-password");

        //user can update profilePic and name email only
        const { name, profilePic, email } = req.body
        const updateUser = await User.updateOne({ _id: user?._id }, {
            name,
            profilePic,
            email
        })

        const updatedUserDetails = await User.findById(user._id)

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

})
exports.doesUserLoggedIn = catchAsync(async (req, res, next) => {

    try {
        return res.status(200).json({
            message: `User Is Logged`,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: `Please Log in ${error}`,
            error: true
        })
    }

})

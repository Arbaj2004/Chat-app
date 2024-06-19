const express = require('express')
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');
const logout = require('../controller/logout');
const updateUserDetails = require('../controller/updateUserDetails');
const searchUser = require('../controller/SearchUser');
const validateUserId = require('../controller/validateUserId');


const router = express.Router()

//create user api
router.post('/register', registerUser);
//check user email
router.post('/email', checkEmail);
//check user password //login
router.post('/password', checkPassword)
//login user details
router.get('/user-details', userDetails)
//logout //token in cookie =''
router.get('/logout', logout)
//update user details
router.patch('/update-user', updateUserDetails)
//get all users
router.post('/search-user', searchUser)
//validate user
router.post('/validateUser', validateUserId)






module.exports = router
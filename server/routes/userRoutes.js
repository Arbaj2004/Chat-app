const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.get('/user-details', userController.userDetails);
router.get('/logged', userController.doesUserLoggedIn);
router.post('/search-user', userController.searchUser)
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateUser', userController.updateUserDetails)



module.exports = router;
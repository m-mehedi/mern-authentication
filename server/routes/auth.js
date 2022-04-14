const express = require('express');
const router = express.Router();

// import controller
const {signup, login, accountValidation, forgotPassword, resetPassword } = require('../controllers/auth');

// import validators
const {userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');
const {runValidation} = require('../validators');

router.post('/signup',userSignupValidator,runValidation, signup);
router.post('/login',userSigninValidator,runValidation, login);
router.post('/account-activation', accountValidation);

// Forgot reset password
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);



// router.get('/signup', signup);

module.exports = router
const express = require('express');

const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetpasswordTokenStatus, resetPassword} = require('../controllers/user');
const { userValidator, validate, validatePassword  } = require('../middlewares/validator');
const { isValidPassResetToken } = require('../middlewares/user');

const router = express.Router()

router.post("/create",userValidator,validate,create);
router.post("/verify-email",verifyEmail);
router.post("/resend-verify-email",resendEmailVerificationToken);
router.post("/forget-password",forgetPassword);
router.post("/verify-pass-reset-token",isValidPassResetToken, sendResetpasswordTokenStatus);
router.post("/reset-password",validatePassword,validate,isValidPassResetToken, resetPassword);


module.exports = router;
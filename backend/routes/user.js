const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetpasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");
const { isValidPassResetToken } = require("../middlewares/user");
const { sendError } = require("../utils/helper");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signIn);

router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendEmailVerificationToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetpasswordTokenStatus
);
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);

router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});

module.exports = router;

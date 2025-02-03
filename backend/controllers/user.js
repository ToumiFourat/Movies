const { isValidObjectId } = require('mongoose');
const PasswordResetToken = require('../models/passwordResetToken');
const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { generateRandomByte, sendError } = require('../utils/helper');
const { generateMailTransporter, generateOTP } = require('../utils/mail');
const jwt = require('jsonwebtoken')


exports.create = async (req,res) => {
    const {name,email,password} = req.body;

    const oldUser =await  User.findOne({ email });
    if(oldUser) return sendError(res, "This email already in use");
    
    const newUser = new User({name,email,password});
    await newUser.save();

    // generate 6 digit otp
    let OTP =generateOTP();
    // store otp inside base donnée
    const newEmailVerif = new EmailVerificationToken({owner:newUser._id,token:OTP})
    await newEmailVerif.save();
    // send otp to user

var transport = generateMailTransporter()

  transport.sendMail({
    from: 'verification@movie.com',
    to: newUser.email,
    subject: 'Email verification',
    html: `
        <p>Your verification OTP </p>
        <h1>${OTP} </h1>
    `
  });


    res.status(201).json({message : 'Please verify your email. OTP has been sent to your email account ! ',});
}

exports.verifyEmail = async (req,res) => {
    const {userId, OTP} = req.body;

    if(!isValidObjectId(userId))
        return sendError(res, 'Invalid user !');
    const user = await User.findById(userId)
    if(!user)
        return sendError(res, 'user not found !');
    if(user.isVerified)
        return sendError(res, 'user is already verified !');
    const token = await EmailVerificationToken.findOne({owner:userId});
    if(!token)
        return sendError(res, 'token not found !');
    const isMatched = await token.compaireToken(OTP);
    if(!isMatched)
        return sendError(res, 'Please submit a valid OTP !');
    user.isVerified = true;
    await user.save();
    await EmailVerificationToken.findByIdAndDelete(token._id);



    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d214be8e3c869e",
          pass: "30d9769cc3fee8"
        }
      });
    
      transport.sendMail({
        from: 'verification@movie.com',
        to: user.email,
        subject: 'Welcome Email',
        html: '<h1>Welcome to our app and thanks for choosing us. </h1>'
      });


    res.json({message : 'Your email is verified. '});
}

exports.resendEmailVerificationToken = async (req, res) => {
    const {userId} = req.body;

    const user = await User.findById(userId);
    if(!user)
        return sendError(res, 'user not found ! ');

    if(user.isVerified)
        return sendError(res, 'This email is already verified !');

    const alreadyHasToken = await EmailVerificationToken.findOne({owner:userId});
    if(alreadyHasToken) return sendError(res, 'Only after one hour you can request for another token !');

     // generate 6 digit otp
    let OTP =generateOTP();
    // store otp inside base donnée
    const newEmailVerif = new EmailVerificationToken({owner:user._id,token:OTP})
    await newEmailVerif.save();
    // send otp to user

var transport = generateMailTransporter()

  transport.sendMail({
    from: 'verification@movie.com',
    to: user.email,
    subject: 'Email verification',
    html: `
        <p>Your verification OTP </p>
        <h1>${OTP} </h1>
    `
  });
  res.json({message:'New OTP has been sent to your registered email account ! '})
};

exports.forgetPassword = async (req,res) => {
  const {email} = req.body;
  if(!email)
    return sendError(res, 'Email is missing !');
  const user = await User.findOne({email});
  if(!user)
    return sendError(res, 'User is not found !', 404);
  const alreadyHasToken = await PasswordResetToken.findOne({owner:user._id});
  if(alreadyHasToken)
    return "sendError"(res, 'Only after one hour you can request for another token ! ');
  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({owner:user._id , token});
  await newPasswordResetToken.save();
  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter()

  transport.sendMail({
    from: 'security@movie.com',
    to: user.email,
    subject: 'Reset Password Link',
    html: `
        <p>Click here to reset password</p>
        <a href='${resetPasswordUrl}'>Change Password</a>
    `
  });

  res.json({message : "Link sent to your email !"})

}

exports.sendResetpasswordTokenStatus =  (req,res) => {
  res.json({valid:true});
  
}

exports.resetPassword= async (req,res) => {
  const {newPassword,userId} = req.body;

  const user = await User.findById(userId);
  const matched = await user.compairePassword(newPassword);
  if(matched)
    return sendError(res, ' The new password must be different from the old one !');
  user.password=newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  const transport = generateMailTransporter()

  transport.sendMail({
    from: 'security@movie.com',
    to: user.email,
    subject: 'Password Reset Successfully',
    html: `
        <h1>Password Reset Successfully</h1>
        <p>Now you can use new password.</p>
    `
  });

  res.json({message: 'Password reset successfully, now you can use new password '})
};
exports.signIn= async (req, res, next)=>{
  
  const {email ,password} = req.body;

    const user = await User.findOne({email})
    if(!user)
      return sendError(res,'Email/Password mismatch! ');
  
    const matched = await user.compairePassword(password);
    if(!matched)
      return sendError(res,'Email/Password mismatch! ');
  
    const {_id , name} = user; 
  
    const jwttoken = jwt.sign({userId: _id},process.env.JWT_SECRET);
  
    res.json({user:{id: _id, name, email, token: jwttoken}});
  
 

}

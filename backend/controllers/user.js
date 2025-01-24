const { isValidObjectId } = require('mongoose');
const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const nodemailer = require('nodemailer')


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
}
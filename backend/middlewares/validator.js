const {check, validationResult} = require('express-validator');


exports.userValidator = 
[
    check('name').trim().not().isEmpty().withMessage('Name is missing !'),
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid !'),
    check('password').trim().not().isEmpty().withMessage('Password is missing !').isLength({min: 8, max: 20}).withMessage('Password must be 8 to 20 characters  long !')
]

exports.validatePassword=[
    check('newPassword').trim().not().isEmpty().withMessage('Password is missing !').isLength({min: 8, max: 20}).withMessage('Password must be 8 to 20 characters  long !')

]
exports.signInValidator=[
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid !'),
    check('password').trim().not().isEmpty().withMessage('Password is missing !')
]
exports.validate = (req, res, next) => {
    const errors = validationResult(req).array(); // Récupère les erreurs de validation
    if (!errors.length) {
        return next(); // Si aucune erreur, passe au middleware suivant
    }

    // Si des erreurs, renvoie-les dans la réponse avec un code 400
    console.log(errors);
    return res.status(400).json({
        errors: errors
    });
};


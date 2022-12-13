// controllers
const AuthenticationController = require('../controllers/AuthenticationController');
const authenticationController = new AuthenticationController();

// validators
const SignInValidation = require('../common/validation/SignInValidation');
const SignUpValidation = require('../common/validation/SignUpValidation');

const { Router } = require('express');
const router = Router();

// router.post(
//   '/sign-up',
//   SignUpValidation,
//   authenticationController
//     .signUp.bind(authenticationController)
// );

router.post(
  '/sign-in',
  SignInValidation,
  authenticationController
    .signIn.bind(authenticationController)
);

module.exports = router;

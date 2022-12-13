// const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const BaseService = require('./BaseService');
const { createToken, verifyToken } = require('../common/token');

module.exports = class AuthService extends BaseService {

  constructor() {
    super();
  }

  // async signUp(req) {
  //   try {
  //     const { email, password, firstName, lastName } = req.body;

  //     const err = this.handleErrors(req);
  //     if(err.hasErrors) {
  //       return err.body;
  //     }

  //     const user = await userModel.findOne({ email }).exec();

  //     if(user) {
  //       return this.response({
  //         status: false,
  //         statusCode: 409,
  //         message: 'User already registered'
  //       });
  //     }

  //     const confirmationToken = createToken({
  //       payload: {
  //         email
  //       },
  //       secret: process.env.JWT_EMAIL_SECRET,
  //       options: {
  //         expiresIn: '2m'
  //       }
  //     });

  //     const createUser = await userModel.create({
  //       confirmationToken,
  //       firstName,
  //       lastName,
  //       password,
  //       email,
  //       role: 'basic'
  //     });

  //     if(createUser) {
  //       const url = `verify-email?email=${email}&token=${confirmationToken}`;

  //       const token = createToken({
  //         payload: {
  //           id: createUser._id
  //         }
  //       });

  //       return this.response({
  //         data: { token },
  //         statusCode: 201,
  //         message: 'User Register'
  //       });
  //     }
  //   } catch(error) {
  //     return this.serverErrorResponse(error);
  //   }
  // }

  async signIn(req) {
    try {
      const err = this.handleErrors(req);
      if(err.hasErrors) {
        return err.body;
      }

      const { email, password } = req.body;

      const user = await userModel.findOne({ email }).exec();

      if(user && bcrypt.compareSync(password, user.password)) {
        if(user.isVerified) {
          const token = createToken({
            payload: {
              id: user._id
            }
          });

          return this.response({
            data: {
              token,
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified,
                role: user.role
              }
            }
          });

        } else {
          return this.response({
            statusCode: 401,
            status: false,
            data: { isVerified: false },
            message: 'Email is not verified'
          });
        }
      }

      return this.response({
        statusCode: 400,
        status: false,
        message: 'Incorrect email and/or  password'
      });

    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

 
};

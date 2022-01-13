/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         admin.service.js
 * @author       deepak
 * @since        9/1/2022
 */

import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as sendEmail from '../middlewares/nodemailer.middleware.js';

//create new Admin
export const newAdmin = async (body) => {
  let email = { email: body.email };

  let foundAdmin = await Admin.findOne(email);

  if (!foundAdmin) {
    let hash = await bcrypt.hash(body.password, 8);
    let newAdmin = new Admin({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hash
    });

    const data = await Admin.create(newAdmin);

    let response = {
      status: 201,
      success: true,
      message: 'admin registration successfull',
      data: data
    };
    return response;
  } else {
    let response = {
      status: 200,
      success: false,
      message: 'admin already exists',
      data: body
    };
    return response;
  }
};

//login Admin
export const loginAdmin = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };

  let email = { email: body.email };
  let foundAdmin = await Admin.findOne(email);

  if (foundAdmin) {
    let match = await bcrypt.compare(body.password, foundAdmin.password);
    if (match) {
      let token = jwt.sign(
        { email: foundAdmin.email, adminId: foundAdmin.id },
        'secret'
      );

      let obj = {
        firstName: foundAdmin.firstName,
        lastName: foundAdmin.lastName,
        adminId: foundAdmin.id,
        email: foundAdmin.email,
        token: token
      };

      response.status = 200;
      response.success = true;
      response.message = 'Login Successful';
      response.data = obj;
      return response;
    }
    response.status = 401;
    response.success = false;
    response.message = 'Invalid Password';
    response.data = body;

    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Admin Not Found';
    response.data = body;

    return response;
  }
};

//forgot password
export const forgotPassword = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };
  let email = { email: body.email };
  let foundAdmin = await Admin.findOne(email);
  if (foundAdmin) {
    //jwt
    let token = jwt.sign(
      { email: foundAdmin.email, id: foundAdmin.id },
      'secret'
    );
    let address = 'http://localhost:3000/reset-password/';

    let link = address + token;

    console.log('Sending email to ', foundAdmin.email);

    let send = await sendEmail.sendEmail(foundAdmin.email, link);

    response.status = 200;
    response.success = true;
    response.message = 'Link Sent To Email';
    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Admin Not Found';
    response.data = body;

    return response;
  }
};

//reset password
export const resetPassword = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };
  let adminId = { _id: body.data.adminId };
  let foundAdmin = await Admin.findOne(adminId);
  if (foundAdmin) {
    //('Resetting Password ', foundAdmin);

    let hash = await bcrypt.hash(body.confirmPassword, 8);

    let newPassword = { password: hash };

    let update = await Admin.findByIdAndUpdate(adminId, newPassword);

    response.status = 200;
    response.success = true;
    response.message = 'Password Update Successful';
    response.data = update;

    return response;
  } else {
    response.status = 200;
    response.success = false;
    response.message = 'Admin Not Found';
    response.data = body;

    return response;
  }
};

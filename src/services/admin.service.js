/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         admin.service.js
 * @author       deepak
 * @since        9/1/2022
 */

import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';

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

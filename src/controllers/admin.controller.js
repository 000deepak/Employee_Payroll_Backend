/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         admin.controller.js
 * @author       deepak
 * @since        9/1/2022
 */

import * as AdminService from '../services/admin.service.js';

/**
 * Controller to create a new Admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.newAdmin(req.body);
    console.log(data.status);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to loginAdmin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.loginAdmin(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to forgot pasword link
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const data = await AdminService.forgotPassword(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

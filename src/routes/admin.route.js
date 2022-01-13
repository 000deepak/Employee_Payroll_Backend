/**
 * @purpose      To forward control to handler fn when given path is hit.
 * @module       routes
 * @file         index.js
 * @author       deepak 
 * @since        9/1/2022
 */

import express from 'express';
import * as AdminController from '../controllers/admin.controller';
import * as Validator from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware'; 

const router = express.Router();

//route to create a new admin
router.post('/register-admin', Validator.adminValidator, AdminController.newAdmin);

//route to login admin
router.post('/login-admin', Validator.loginValidator, AdminController.loginAdmin);

//Forgot Password
router.post('/forgot-password', Validator.emailValidator, AdminController.forgotPassword);

//Reset password
router.post('/reset-password', userAuth,Validator.passwordValidator, AdminController.resetPassword); 


export default router;

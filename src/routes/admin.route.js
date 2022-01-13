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

//get all admins
router.get('/get-all-admin', AdminController.getAllAdmin);

//get single admin 
router.get('/get-admin', AdminController.getAdmin);

//update admin
router.put('/update-admin',Validator.adminValidator,AdminController.updateAdmin); 

//delete admin
router.delete('/delete-admin', AdminController.deleteAdmin ); 


export default router;

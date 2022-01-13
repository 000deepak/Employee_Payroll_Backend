import express from 'express';
import * as EmployeeController from '../controllers/employee.controller';
import * as Validator from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add employee
router.post('/add-employee',userAuth , EmployeeController.newEmployee);

export default router;

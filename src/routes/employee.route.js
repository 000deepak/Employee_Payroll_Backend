import express from 'express';
import * as EmployeeController from '../controllers/employee.controller';
import * as Validator from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add employee
router.post('/add-employee',userAuth , EmployeeController.newEmployee);

//route to get ALL employee
router.get('/get-all-employee',userAuth , EmployeeController.getAllEmployees);

//route to get a SINGLE employee by their user id
router.get('/get-employee',userAuth , EmployeeController.getEmployee);

//route to update a single employee by their user id
router.put('/update-employee/:_id',userAuth , EmployeeController.updateEmployee);


export default router;

import HttpStatus from 'http-status-codes';
import * as EmployeeService from '../services/employee.service.js';

/**
 * Controller to create a new Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.newEmployee(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all Employees available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllEmployees = async (req, res, next) => {
  try {
    const data = await EmployeeService.getAllEmployees();
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getEmployee = async (req, res, next) => {
  try {
    //const data = await EmployeeService.getEmployee(req.params._id);
    const data = await EmployeeService.getEmployee(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.updateEmployee(req.params._id, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteEmployee = async (req, res, next) => {
  try {
    //await EmployeeService.deleteEmployee(req.params._id);
    let data = await EmployeeService.deleteEmployee(req.params._id);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

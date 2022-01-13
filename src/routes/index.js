/**
 * @purpose      To divert control to admin routes when given path is hit.
 * @module       index
 * @file         index.js
 * @author       deepak 
 * @since        9/1/2022
 */

import express from 'express';
const router = express.Router();
import adminRoute from './admin.route';
import employeeRoute from './employee.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome to employee payroll application');
  });
  router.use('/users', adminRoute);
  router.use('/employee', employeeRoute);
 

  return router;
};

export default routes;

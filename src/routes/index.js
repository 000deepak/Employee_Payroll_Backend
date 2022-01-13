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
 

  return router;
};

export default routes;

/**
 * Routes for the users/auth.
 * host + /api/auth
 */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createUser, loginUser, renewtoken } = require('../controllers/auth'); 
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

/**
 * create new user
 * host + /api/auth/create
 */
router.post('/create',[
   check('name', 'Name is required').not().isEmpty(),
   check('name', 'Name must be 3 characters').isLength({ min: 3 }),
   check('email', 'Email is required').isEmail(),
   check('password', 'Password must be 6 characters').isLength({ min: 6 }),
   validateFields,
],createUser);

/**
 * login user
 * host + /api/auth/login
 */
 router.post('/login',[
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields,
 ] ,loginUser);

/**
 * renew token
 * host + /api/auth/renewtoken
 */
 router.get('/renewtoken', validateJWT ,renewtoken);


module.exports = router;
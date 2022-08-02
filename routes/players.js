/**
 * Routes for the users/auth.
 * host + /api/auth
 */
 const express = require('express');
 const router = express.Router();
 const { check } = require('express-validator');
 const { createPlayer, getPlayers, deletePlayer } = require('../controllers/player'); 
 const { validateFields } = require('../middlewares/validateFields');
 const { validateJWT } = require('../middlewares/validate-jwt');

 /**
  * create new player
  * host + /api/player/create
  */
 router.get('/getPlayers', validateJWT ,getPlayers);
 
 /**
  * create new player
  * host + /api/player/create
  */
 router.post('/create',[
    check('name', 'Name is required').not().isEmpty(),
    check('tennisShot', 'TennisShot must be 3 characters').isLength({ min: 3 }),
    check('location', 'Location must be 3 characters').isLength({ min: 3 }),
    check('birthday', 'Birthday must be 3 characters').isLength({ min: 3 }),
    check('level', 'Level must be 3 characters').isLength({ min: 3 }),
    validateFields,
 ] , validateJWT,createPlayer);

  /**
  * create new player
  * host + /api/player/create
  */
  router.delete('/deletePlayer', validateJWT ,deletePlayer);
 
 module.exports = router;
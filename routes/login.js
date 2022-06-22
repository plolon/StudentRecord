const express = require('express');

const loginController = require('../controllers/login');
const router = express.Router();

// GET /register
router.get('/register', loginController.getRegister);;
// POST /register
router.post('/register', loginController.postRegister);;
// GET /login
router.get('/login', loginController.getLogin);;
router.get('/login/:state', loginController.getLogin);;
// POST /login
router.post('/login', loginController.postLogin);
// GET /exit
router.get('/exit', loginController.logOut);
module.exports = router;
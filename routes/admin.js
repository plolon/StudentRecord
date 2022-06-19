const express = require('express');

const adminController = require('../controllers/admin');
const router = express.Router();

//GET /admin/add-user
router.get('/add-user', adminController.getAddUser);
//POST /admin/add-user
router.post('/add-user', adminController.postAddUser);
//GET /admin/users
router.get('/users', adminController.getUsers);

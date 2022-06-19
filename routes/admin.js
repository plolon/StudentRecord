const express = require('express');

const adminController = require('../controllers/admin');
const router = express.Router();

//GET /admin/add-user
router.get('/add-user', adminController.getAddUser);
//POST /admin/add-user

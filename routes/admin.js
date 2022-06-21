const express = require('express');

const adminController = require('../controllers/admin');
const router = express.Router();

//GET /admin/add-user
router.get('/add-user', adminController.getAddUser);
//POST /admin/add-user
router.post('/add-user', adminController.postAddUser);
//GET /admin/users
router.get('/users', adminController.getUsers);
// GET /admin/user/{id}
router.get('/user/:userId', adminController.getUser);
// GET /admin/edit-user
router.get('/edit-user/:userId', adminController.getEditUser);
// POST /admin/edit-user
router.post('/edit-user', adminController.postEditUser);
//POST /admin/delete-user
router.post('/delete-user', adminController.postDeleteUser);

module.exports = router;
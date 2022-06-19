const express = require('express');

const recordController = require('../controllers/record');
const router = express.Router();

// GET /record/students
router.get('/my-grades', recordController.getMyGrades);
router.get('/my-grades/:subjectTitle', recordController.getMyGrades);

module.exports = router;
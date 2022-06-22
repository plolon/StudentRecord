const express = require('express');

const recordController = require('../controllers/record');
const router = express.Router();

// GET /record/students
router.get('/my-grades', recordController.getMyGrades);
router.get('/my-grades/:subjectTitle', recordController.getMyGrades);
// GET /record/students
router.get('/students', recordController.getStudents);
// GET /record/grades/{id}
router.get('/grades/:id', recordController.getStudentGrades);
router.get('/grades/:id/:subjectTitle', recordController.getStudentGrades);
// GET /record/add-grade
router.get('/add-grade/:userId/:subjectTitle', recordController.getAddGrade);
// POST /record/add-grade
router.post('/add-grade', recordController.postAddGrade);
// GET /record/edit-grade
router.get('/edit-grade/:gradeId', recordController.getEditGrade)
// POST /record/edit-grade
router.post('/edit-grade', recordController.postEditGrade);
// POST /record/delete-grade
router.post('/delete-grade', recordController.postDeleteGrade);

module.exports = router;
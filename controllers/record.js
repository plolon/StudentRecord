const Subject = require('../models/subject');
const User = require('../models/user');
const Grade = require('../models/grade');
const Permission = require('../models/permission');

// GET /record/my-grades/:subjectTitle
exports.getMyGrades = (req, res, next) => {
    let us;
    let subjectsList;
    let subjectTitle = "BZDURA";
    if(req.params.subjectTitle !== undefined){
        subjectTitle = req.params.subjectTitle;
    }
    Subject.findAll()
    .then(subjects => {
        subjectsList = subjects;
        return User.findByPk(req.session.user.id);
    })
    .then(user => {
        us = user;
        if(subjectTitle !== "BZDURA")
            return user.getGrades({include: {model: Subject, where:{name: subjectTitle}}});
        return user.getGrades({include: Subject});
    })
    .then(grades => {
        res.render('record/student-grades', {
            user: req.session.user,
            pageTitle: 'Moje Oceny',
            path: '/record/my-grades',
            gradesUser: us,
            grades: grades,
            gradesUser: us,
            subjectTitle: subjectTitle,
            subjects: subjectsList,
            teacher: false  
        });
    })
    .catch(err => console.error(err));
};

// GET /record/students
exports.getStudents = (req, res, next) => {
    User.findAll({include: {model: Permission, where: {code: 0}}})
    .then(users => {
        res.render('record/students-list', {
            user: req.session.user,
            pageTitle: 'Students',
            path: '/record/students',
            users: users
        });
    })
    .catch(err => console.error(err));
};
// GET /record/grades/{id}/{subjectTitle}
exports.getStudentGrades = (req, res, next) => {
    let subjectsList;
    let subjectTitle = "BZDURA";
    if(req.params.subjectTitle !== undefined){
        subjectTitle = req.params.subjectTitle;
    }
    console.log('SUBJECT=',subjectTitle);
    let user;
    Subject.findAll()
    .then(subjects => {
        subjectsList = subjects;
        return User.findByPk(req.params.id);
    })
    .then(us => {
        user = us;
        user.getGrades()
        .then(grades => {
            res.render('record/student-grades', {
                user: req.session.user,
                pageTitle: 'Grades',
                path: '/record/students',
                gradesUser: user,
                grades: grades,
                subjectTitle: subjectTitle,
                subjects: subjectsList,
                teacher: true  
            });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}
// GET /record/add-grade
exports.getAddGrade = (req, res, next) => {
    let student;
    User.findByPk(req.params.userId)
    .then(user => {
        student = user;
        return user;
    })
    .then(user => {
        return Subject.findOne({ where: { name: req.params.subjectTitle } });
    })
    .then(subject => {
        console.log(subject);
        res.render('record/add-grade', {
            pageTitle: 'Dodaj Ocene',
            path: '/record/students',
            user: student,
            subject: subject,
            editing: false
        });
    })
    .catch(err => console.error(err));
}
// POST /record/add-grade
exports.postAddGrade = (req, res, next) => {
    let createdGrade;
    let student;
    User.findByPk(req.body.userId)
    .then(user => {
        student = user;
        return user.createGrade({
            name: req.body.name,
            teacherName: req.body.teacherName,
            value: req.body.value
        });
    })
    .then(result =>{
        createdGrade = result;
        return Subject.findOne({where: {name: req.body.subjectName}})
    })
    .then(subject => {
        return createdGrade.addSubject(subject);
    })
    .then(result => {
        res.redirect('/record/grades/' + student.id + '/' +req.body.subjectName);
    })
    .catch(err=>console.error(err));
}
// GET /record/edit-grade
exports.getEditGrade = (req, res, next) => {
    let student;
    let gradeB;
    Grade.findByPk(req.params.gradeId)
    .then(grade => {
        gradeB = grade;
        return User.findByPk(grade.userId);
    })
    .then(user => {
        student = user;
        return gradeB.getSubjects();
    })
    .then(subjects => {
        res.render('record/add-grade', {
            pageTitle: 'Edytuj Ocene',
            path: '/record/students',
            user: student,
            subject: subjects[0],
            grade: grade,
            editing: true
        });
    })
    .catch(err => console.error(err));
}
// POST /record/edit-grade
exports.postEditGrade = (req, res, next) => {
    let student;
    User.findByPk(req.body.userId)
    .then(user => {
        student = user;
        return Grade.findByPk(req.body.gradeId);
    })
    .then(grade => {
        grade.name = req.body.name;
        grade.teacherName= req.body.teacherName;
        grade.value= req.body.value;
        return grade.save();
    })
    .then(result => {
        res.redirect('/record/grades/' + student.id + '/' + req.body.subjectName);
    })
    .catch(err=>console.error(err));
}
// POST /record/delete-grade
exports.postDeleteGrade = (req, res, next) => {
    let student;
    User.findByPk(req.body.userId)
    .then(user => {
        student = user;
        return Grade.findByPk(req.body.gradeId);
    })
    .then(grade =>{
        return grade.destroy();
    })
    .then(result => {
        res.redirect('/record/grades/' + student.id + '/' + req.body.subjectName);
    })
    .catch(err => console.error(err));
}

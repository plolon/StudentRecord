const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const bodyParser = require('body-parser');
const path = require('path');


// UTILS
const sequelize = require('./util/database');
const createSubjects = require('./util/createSubject');
const createAdmin = require('./util/createAdminUser');

// MODELS
const Grade = require('./models/grade');
const Permission = require('./models/permission');
const User = require('./models/user');
const Subject = require('./models/subject');

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.set('trust proxy', 1)
app.use(session({
    secret: "secretTokenKekw",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

createSubjects();
createAdmin();

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');
const recordRoutes = require('./routes/record');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if(req.session.user === undefined && req.url !== '/login' && req.url !== '/login/1' && req.url !== '/login/2' && req.url !== '/register')
        res.redirect('/login');
    else    
        next();
});
 app.use(loginRoutes);
 app.use('/admin', adminRoutes);
 app.use('/record', recordRoutes);
 app.use(errorController.get404);

// RELATIONS
User.belongsTo(Permission);
Permission.hasMany(User);
Grade.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Grade);
Grade.belongsToMany(Subject, { through: 'grade_subject' });
Subject.belongsToMany(Grade, { through: 'grade_subject' });

sequelize.sync()
.then(result => {
    app.listen(4000);
})
.catch(err => console.error(err));
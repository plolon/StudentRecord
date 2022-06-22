const User = require('../models/user');
const Permission = require('../models/permission');

//GET /login
exports.getLogin = (req, res, next) => {
    let message = "";
    if(req.params.state === '1')
        message="Nie znaleziono użytkownika z podanym loginem i hasłem.";
    else if(req.params.state === '2')
        message="Pomyśle zarejestrowano, możesz się zalogować.";
    res.render('loginPage', {
        pageTitle: 'Zaloguj sie',
        message: message
    });
};
//POST /login
exports.postLogin = (req, res, next) => {
    let us;
    User.findOne({where: {username: req.body.username}})
    .then(user => {
        if(user === null)
            res.redirect('/login/1');
        else{
            us=user;
            return user.authenticate(req.body.password);
        }
    })
    .then(result => {
        if(result)
            return Permission.findOne({where: {id: us.permissionId}});
        else
            res.redirect('/login/1');
    })
    .then(permission => {
        req.session.user = {
            id: us.id,
            name: us.username,
            permissionCode: permission.code,
            permissionName: permission.name
        };
        if(permission.code === 0)
            res.redirect('/record/my-grades');
        else if(permission.code === 1)
            res.redirect('/record/students');
        else
            res.redirect('/admin/users');
    })
    .catch(err => console.error(err));
};
//GET /register
exports.getRegister = (req, res, next) => {
    res.render('registerPage', {
        pageTitle: 'Zarejestruj sie',
    });
};
//POST /register
exports.postRegister = (req, res, next) => {
    Permission.findOne({where: {code: 0}})
    .then(permission => {
        return User.create({
            username: req.body.username,
            password: req.body.password,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png',
            permissionId: permission.id
        });
    })
    .then(result => {
        console.log(result);
        res.redirect('/login/2');
    })
    .catch(err=>console.err(err));
};
exports.logOut = (req, res, next) => {
    req.session.user = undefined;
    res.redirect('/');
}
const User = require('../models/user');
const Permission = require('../models/permission');

// GET /admin/users
exports.getUsers = (req, res, next) => {
    console.log('redirected: ', req.session);
    User.findAll()
    .then(users => {
        res.render('admin/users-list', {
            user: req.session.user,
            pageTitle: 'Users',
            path: '/admin/users',
            users: users
        });
    })
    .catch(err => console.error(err));
};
// GET /admin/user/{id}
exports.getUser = (req, res, next) => {
    let us;
    User.findByPk(req.params.userId)
    .then(user => {
        us = user;
        return Permission.findOne({where: {id: user.permissionId}});
    })
    .then(permission => {
        res.render('admin/user-details', {
            user: req.session.user,
            pageTitle: 'User',
            path: '/admin/user',
            us: us,
            permission: permission
        });
    })
    .catch(err => console.error(err));
};
// GET /admin/add-user
exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Dodaj Użytkownika',
        path: '/admin/add-user',
        user: req.session.user,
        editing: false
    });
};
// POST /admin/add-user
exports.postAddUser = (req, res, next) => {
    Permission.findOne({where: {code: req.body.permission}})
    .then(permission => {
        return User.create({
            username: req.body.username,
            password: req.body.password,
            imageUrl: req.body.imageUrl,
            permissionId: permission.id
        });
    })
    .then(result => {
        console.log(result);
        res.redirect('/admin/users');
    })
    .catch(err => console.error(err));
};
// GET /admin/edit-user
exports.getEditUser = (req, res, next) => {
    let us;
    User.findByPk(req.params.userId)
    .then(user => {
        us = user;
        return Permission.findOne({where: {id: user.permissionId}});
    })
    .then(permission => {
        res.render('admin/add-user', {
            pageTitle: 'Edytuj Użtkownika',
            path: '/admin/users',
            user: req.session.user,
            us: us,
            permissionCode: permission.code,
            editing: true
        });
    })
    .catch(err => console.error(err));
};
// POST /admin/edit-user
exports.postEditUser = (req, res, next) => {
    let us;
    User.findByPk(req.body.userId)
    .then(user => {
        us = user;
        return Permission.findOne({where: {code: req.body.permission}});
    })
    .then(permission => {
        us.username = req.body.username;
        us.password = req.body.password;
        us.imageUrl = req.body.imageUrl;
        us.permissionId = permission.id;
        return us.save();
    })
    .then(result => {
        res.redirect('/admin/user/' + us.id);
    })
    .catch(err=>console.error(err));
};
//POST /admin/delete-user
exports.postDeleteUser = (req, res, next) => {
    let user;
    User.findByPk(req.body.userId)
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        res.redirect('/admin/users');
    })
    .catch(err => console.error(err));
};
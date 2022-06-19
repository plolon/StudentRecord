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

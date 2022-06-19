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

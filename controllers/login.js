const User = require('../models/user');

// GET /login
exports.getLogin = (req, res, next) => {
    res.redner('loginPage', {pageTitle: 'Login'});
}
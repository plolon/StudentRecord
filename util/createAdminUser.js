const User = require('../models/user');
const Permission = require('../models/permission');

const permissionList = ['Uczeń', 'Nauczyciel', 'Administrator'];

function createPermissions(){
    for(var i=0; i<permissionList.length; i++) {
        let currentName = permissionList[i];
        let currentCode = i;
        Permission.findAll({where: {name: permissionList[i]}})
        .then(permissions => {
            if(!permissions.length > 0) {
                console.log('create');
                return Permission.create({name: currentName, code: currentCode});
            }
            return null;
        })
        .then(result => console.log(result))
        .catch(err => console.error(err));
    }
    createAdminUser();
}

function createAdminUser(){
    console.log("createAdminUser");
    User.findAll({where: {username: 'admin'}})
    .then(users => {
        console.log("createAdminUser users");
        if(!users.length > 0) {
            return Permission.findOne({where: {code: 2}})
        }
        return null;
    })
    .then(permission => {
        if(permission !== null)
            return permission.createUser({username: 'admin', password: 'admin', imageUrl: 'https://www.kindpng.com/picc/m/247-2472302_admin-transparent-background-admin-icon-hd-png-download.png'});
        return 'exists';
    })
    .then(result => console.log(result))
    .catch(err => console.error(err));
}

module.exports = createPermissions;
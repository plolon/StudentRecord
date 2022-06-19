const Subject = require('../models/subject');

const subjectList = ['Matematyka', 'Polski', 'Angielski', 'Chemia'];

function createSubjects(){
    for(var i=0; i<subjectList.length; i++){
        let currentName = subjectList[i];
        Subject.findAll({where: {name: subjectList[i]}})
        .then(subjects => {
            if(!subjects.length > 0){
                console.log('create');
                return Subject.create({name: currentName});
            }
        })
        .then(result => console.log(result))
        .catch(err => console.error(err));
    }
}

module.exports = createSubjects;
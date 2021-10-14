const fs = require('fs');
const path = require('path');

//path to the task.json
const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'task.json');

module.exports = class Task {
    constructor(task){
        this.description = task;
    }

    saveTask(){
        fs.readFile(pathToFile, (error, fileContent) =>{
            let tasks = [];

            if(!error){
                tasks = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            tasks.push(this);

            fs.writeFile(pathToFile, JSON.stringify(tasks), (error) => {
                console.log('Error', error);
            });

        });
    }

}

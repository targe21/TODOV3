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

    static fetchTasks(callBack){
        fs.readFile(pathToFile, (error, fileContent) => {
            if(error) {
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });

    }

    static deleteItem(task) {
        //get data from the json file
        fs.readFile(pathToFile, (error, fileContent) => {
            let tasks = [];
            if(!error){
                tasks = JSON.parse(fileContent);
            }
        //delete an item from the tasks arrays
            for(let i = 0; i < tasks.length; i++ ) {
                if(tasks[i].description === task){
                    //delete an element from the array
                    tasks.splice(i, 1);
                    break;
                }
            }

            fs.writeFile(pathToFile, JSON.stringify(tasks), (error) => {
                console.log(error);
            });
        });
    }

}

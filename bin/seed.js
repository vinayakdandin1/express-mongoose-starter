const mongoose = require('mongoose')

// First check if our db is connected

require('../config/db.config.js')

//require the model

let TodoModel = require('../models/Todo.model.js')

// insert into the model

TodoModel.insertMany( [ 
    {name: 'Groceries', description: 'Get groceries for today'}, 
    {name: 'Module2', description: 'Teach express, Handlebars'} 
]).then(() => {
    console.log("Data seeded");
    //Always close the connection after seeding
    // Please make sure 
    mongoose.connection.close()
}).catch((error) => {
    console.log("Data seeding went wrong", error);
})
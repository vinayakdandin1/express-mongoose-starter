const express = require('express')

const router = express.Router()

// grab your database model
let TodoModel = require('../models/Todo.model.js')

router.get('/', (req, res) => {
    res.render('landing.hbs')
})

router.get('/todos', (req, res) => {

    // Fetch all the todos from my database
    TodoModel.find()
        .then((todos) => {
            res.render('todos.hbs', {todos})
        })
        .catch((err) => {
            console.log(err);
        })
    
} )

router.get('/todos/create', (req, res) => {
    res.render('create-form.hbs')
})

router.post('/todos/create', (req, res) => {
    //do something
    const { myTodo, myDescription } = req.body
    let myNewTodo = {
        name: myTodo,
        description: myDescription
    }

    TodoModel.create(myNewTodo)
        .then(() => {
            // redirect the user to the /todos page
            res.redirect('/todos')
        })
        .catch(() => {
            console.log("something went wrong creating");
        })

})

//Create a route to handle todo details

router.get('/todos/:id', (req, res) => {
    //grab the todo id from the url
    let id = req.params.id

    TodoModel.findById(id)
        .then((todo) => {
            res.render('todo-Detail.hbs', {todo})
        })
        .catch(() => {
            console.log("something went wrong while getting a todo");
        })
})

//Handle delete requests
router.get('/todos/:id/delete', (req, res) => {
    let id= req.params.id

    TodoModel.findByIdAndDelete(id)
        .then(() => {
            //When delete successful, redirect the user to /todos page

            res.redirect('/todos')

        })
        .catch(() => {
            console.log("Delete failed");
        })
})

// handle /todos/:id/edit => show an edit form
// handle edit requests

router.get('/todos/:id/edit', (req, res) => {
    let id= req.params.id

    //get all the todo info to show on the edit form
    TodoModel.findById(id)
        .then((todo) => {
            res.render('edit-form.hbs', {todo})
        })
        .catch(() => {
            console.log("something went wrong in edit");
        })
})

// Handle edit post requests

router.post('/todos/:id/edit', (req, res) => {
    let id = req.params.id
    const {myTodo, myDescription} = req.body

    let editedTodo = {
        name: myTodo,
        description: myDescription
    }

    TodoModel.findByIdAndUpdate(id, editedTodo)
        .then(() => {
            res.redirect('/todos')
        })
        .catch(() => {
            console.log("Edit failed");
        })

})

module.exports = router
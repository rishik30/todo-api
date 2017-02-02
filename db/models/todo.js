var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var saveTodo = (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    todo.save()
     .then((doc) => {
         res.send(doc);
     })
     .catch((err) => {
         res.status(400).send(err);
     });
}

var getAllTodos = (req, res) => {
    Todo.find()
        .then((todos) => {
            res.json({
                message: "Fetched all todos",
                status: "OK",
                todos
            });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

var getATodo = (req, res) => {
    if(!ObjectID.isValid(req.params.id)) return res.status(404).send('ID is invalid.');

    Todo.findById(req.params.id)
        .then((todo) => {
            if(!todo) return res.status(404).send(`Todo with ID: ${req.params.id} not found`);
            res.send(todo);
        })
        .catch((err) => {
            res.status(400).send();
        });
}

module.exports = {
    Todo,
    saveTodo,
    getAllTodos,
    getATodo
}

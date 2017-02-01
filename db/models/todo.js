var mongoose = require('mongoose');

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

module.exports = {
    Todo,
    saveTodo,
    getAllTodos
}

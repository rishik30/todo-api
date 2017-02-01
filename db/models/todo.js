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
         res.send(err);
     });
}
module.exports = {
    saveTodo
}

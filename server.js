var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var saveTodo = require('./db/models/todo').saveTodo;
var getAllTodos = require('./db/models/todo').getAllTodos;
var getATodo = require('./db/models/todo').getATodo;
var deleteTodo = require('./db/models/todo').deleteTodo;
var User = require('./db/models/user').User;

var app = express();
app.use(bodyParser.json());

app.post('/todoapi/todo', saveTodo);

app.get('/todoapi/todo', getAllTodos);

app.get('/todoapi/todo/:id', getATodo);

app.delete('/todoapi/todo/:id', deleteTodo);

app.listen(3000, () => {
    console.log('Up and running on port 3000!');
});

module.exports = {app};

var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var saveTodo = require('./db/models/todo').saveTodo;
var User = require('./db/models/user').User;

var app = express();
app.use(bodyParser.json());

app.post('/todoapi/todo', saveTodo);

app.listen(3000, () => {
    console.log('Up and running on port 3000!');
});

module.exports = {app};

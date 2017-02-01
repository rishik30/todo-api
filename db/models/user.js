var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

module.exports = User;

const { Schema, model } = require('mongoose');

const userSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
})

module.exports = model('User', userSchema);
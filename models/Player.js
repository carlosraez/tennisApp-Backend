const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    tennisShot: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        minlength: 3,
    },
    birthday: {
        type: String,
        required: true,
    },
    level: { 
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = model('Player', playerSchema);
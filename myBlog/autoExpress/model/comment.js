const mongoose = require('../db/db');
const uuid = require('node-uuid');

const CommentSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuid.v1
    },
    author: String,
    avatar: String,
    content: String,
    BlogID: String,
    datetime: {
        type: Date,
        default: new Date()
    },
    Child: [{
        id: {
            type: String,
            default: uuid.v1
        },
        author: String,
        avatar: String,
        content: String,
        datetime: {
            type: Date,
            default: new Date()
        },
        forID: String,
        toAuthor: String
    }]
});


const CommentModel = mongoose.model('comment', CommentSchema);


module.exports = CommentModel;
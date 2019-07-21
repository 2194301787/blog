const mongoose = require('../db/db');
const uuid = require('node-uuid');

const BlogSchema = mongoose.Schema({
    id:{
        type:String,
        default : uuid.v1
    },
    title:String,
    content:String,
    createTime:{
        type:Date,
        default:new Date()
    }
});

const BlogModel = mongoose.model('blog',BlogSchema);


module.exports = BlogModel;
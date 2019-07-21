const mongoose = require('../db/db');
const uuid = require('node-uuid');

const UserSchema = mongoose.Schema({
    id:{
        type:String,
        default : uuid.v1
    },
    username:String,
    password:String,
    phone:Number,
    birthday:Date,
    email:String,
    myAvatar:{
        type:String,
        default : "images/defautAvatar.jpeg"
    }
});

const UserModel = mongoose.model('user',UserSchema);


module.exports = UserModel;
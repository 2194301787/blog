const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/MyBlog';

mongoose.connect(mongoURL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => { console.log(err) });

db.once('open', () => {
    console.log('mongooseDB 连接成功');
});

module.exports = mongoose;

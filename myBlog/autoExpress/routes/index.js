var express = require('express');
var router = express.Router();
const indexHandle = require('../controller/indexHandle');

router.get('/',indexHandle.home);

router.post('/addBlog', indexHandle.addBlog);

router.post('/selectBlog', indexHandle.selectBlog);

router.post('/findBlog', indexHandle.findBlog);

router.post('/selectComment', indexHandle.selectComment);

router.post('/addComment', indexHandle.addComment);

router.post('/addChildComment', indexHandle.addChildComment);


module.exports = router;

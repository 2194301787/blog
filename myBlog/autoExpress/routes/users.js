var express = require('express');
var router = express.Router();
const userHandle = require('../controller/userHandle');


router.post('/login', userHandle.login);

router.post('/logout',userHandle.logout);

router.post('/getUser',userHandle.getUser);

router.post('/findUser',userHandle.findUser);

router.post('/register',userHandle.register);

router.post('/getPublicDerStr',userHandle.getPublicDerStr);

router.post('/updateUser',userHandle.updateUser);

router.post('/upload',userHandle.upload);

router.post('/uploadBlogImg',userHandle.uploadBlogImg);

module.exports = router;

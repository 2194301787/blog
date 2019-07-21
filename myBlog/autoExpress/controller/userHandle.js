const UserModel = require('../model/user');
const fs = require('fs');
const moment = require('moment');
const multiparty = require('multiparty');
const { decrypt, EncryptS, DecryptS } = require('../util/decrypt');

const handle = {
    getPublicDerStr(req, res) {
        fs.readFile('./pem/public.pem', function (err, data) {
            if (err) {
                return console.log(err);
            }
            let reslut = data.toString();
            if (reslut) {
                res.send({
                    msg: 200,
                    data: {
                        publicDerStr: reslut
                    }
                })
            } else {
                res.send({
                    msg: 0,
                    data: '获取公钥失败'
                })
            }
        });
    },
    login(req, res) {
        let { username, password } = req.body;
        password = decrypt(password);
        UserModel.findOne({ "username": username }, (err, doc) => {
            if (!err) {
                let Password = doc ? doc.password : false;
                if (!Password) {
                    res.send({
                        msg: 0,
                        data: '用户不存在'
                    })
                } else if (password !== DecryptS(Password, username)) {
                    res.send({
                        msg: 1,
                        data: '密码错误'
                    });
                } else {
                    req.session.username = username;
                    res.send({
                        msg: 200,
                        data: {
                            id: doc._id,
                            username: doc.username,
                            phone: doc.phone,
                            birthday: doc.birthday,
                            email: doc.email,
                            myAvatar: doc.myAvatar
                        }
                    });
                }
            }
        });
    },
    getUser(req, res) {
        let { username } = req.session;
        if (username) {
            UserModel.findOne({ "username": username }, (err, doc) => {
                if (doc) {
                    res.send({
                        msg: 200,
                        data: {
                            username: doc.username,
                            phone: doc.phone,
                            birthday: doc.birthday,
                            email: doc.email,
                            myAvatar: doc.myAvatar
                        }
                    });
                } else {
                    res.send({
                        msg: 0,
                        data: '找不到该用户'
                    })
                }
            });
        } else {
            res.send({
                msg: 0,
                data: {
                    message: '还未登陆'
                }
            });
        }
    },
    logout(req, res) {
        req.session.username = null;
        res.send({
            msg: 200,
            data: {
                message: '注销成功'
            }
        })
    },
    findUser(req, res) {
        let { username } = req.body;
        UserModel.findOne({ "username": username }, (err, doc) => {
            if (doc) {
                res.send({
                    msg: 200,
                    data: {
                        username: doc.username,
                        phone: doc.phone,
                        birthday: doc.birthday,
                        email: doc.email,
                        myAvatar: doc.myAvatar
                    }
                });
            } else {
                res.send({
                    msg: 0,
                    data: '找不到该用户'
                })
            }
        });
    },
    register(req, res) {
        let { username, password, phone, birthday, email } = req.body;
        password = decrypt(password);
        password = EncryptS(password, username);
        let userModel = new UserModel({
            username,
            password,
            phone,
            birthday:moment(birthday, 'YYYY-MM-DD'),
            email
        });
        userModel.save((err) => {
            if (err) {
                console.log('插入用户信息失败' + err);
                res.send({
                    msg: 0,
                    data: '注册用户失败'
                })
            } else {
                res.send({
                    msg: 200,
                    data: '注册成功'
                })
            }
        });
    },
    upload: function (req, res) {
        let username = req.session.username;
        // 解析一个文件上传
        var form = new multiparty.Form();
        //设置文件存储路径
        form.uploadDir = "upload/myAvatar/";
        //设置单文件大小限制
        form.maxFilesSize = 10 * 1024 * 1024;
        //form.maxFields = 1000;  设置所以文件的大小总和
        //解析表单数据
        form.parse(req, function (err, fields, files) {
            //fields:非文件内容；files：文件内容
            var inputFile = files.MyAvatar[0];
            var newFileURL = username + "-" + inputFile.originalFilename;
            //重命名文件名
            fs.rename(inputFile.path, `./upload/myAvatar/${newFileURL}`, (err) => {
                if (err) {
                    throw err;
                } else {
                    //具体操作
                    res.send({
                        msg: 200,
                        data: "上传图片成功",
                        filename: newFileURL
                    });
                }
            });
        });
    },
    updateUser(req, res) {
        let { username, phone, birthday, email, myAvatar } = req.body;
        let updateData = {
            username,
            phone,
            birthday,
            email,
            myAvatar
        }
        UserModel.updateOne({"username":username},updateData,(err,doc)=>{
            if(err){
                res.send({
                    msg:0,
                    data:'更改失败'
                });
                console.log('更改失败'+err);
            }else{
                res.send({
                    msg:200,
                    data:'更改成功'
                });
            }
        });
    },
    uploadBlogImg: function (req, res) {
        // 解析一个文件上传
        var form = new multiparty.Form();
        //设置文件存储路径
        form.uploadDir = "upload/myAvatar/";
        //设置单文件大小限制
        form.maxFilesSize = 10 * 1024 * 1024;
        //form.maxFields = 1000;  设置所以文件的大小总和
        //解析表单数据
        form.parse(req, function (err, fields, files) {
            //fields:非文件内容；files：文件内容
            var inputFile = files.myBlog[0];
            var newFileURL = new Date().getTime() + "-" + inputFile.originalFilename;
            //重命名文件名
            fs.rename(inputFile.path, `./upload/myBlog/${newFileURL}`, (err) => {
                if (err) {
                    throw err;
                } else {
                    //具体操作
                    res.send({
                        msg: 200,
                        data: "上传图片成功",
                        filename: newFileURL
                    });
                }
            });
        });
    }
}

module.exports = handle;
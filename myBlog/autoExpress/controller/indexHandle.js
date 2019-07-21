const BlogMoel = require('../model/blog');
const CommentModel = require('../model/comment');
const moment = require('moment');


moment.locale('zh-cn');
const handle = {
    home(req, res) {
        res.render('../views/index.ejs');
    },
    addBlog(req, res) {
        if (req.session.username === 'Sam') {
            let blog = new BlogMoel(req.body);
            blog.save((err) => {
                if (err) {
                    console.log(err);
                    res.send({
                        msg: 0,
                        data: err
                    })
                } else {
                    res.send({
                        msg: 200,
                        data: '添加文章成功'
                    })
                }
            })
        } else {
            res.send({
                msg: 1,
                data: '没有权限'
            })
        }
    },
    updateBlog(req,res){
        let {id,title,content,createTime} = req.body;
        BlogMoel.updateOne({id},{
            title,
            content,
            createTime
        },(err,doc)=>{
            if(err){
                res.send({
                    msg:0,
                    data:'更新文章失败'
                })
            }else{
                res.send({
                    msg:200,
                    data:'更新文章成功'
                })
            }
        });
    },
    selectBlog(req, res) {
        let { pageSize, currentPage, type, searchValue } = req.body;
        let skipnum = (currentPage - 1) * pageSize;
        switch (type) {
            case 'time':
                BlogMoel.find({}).skip(skipnum).limit(pageSize)
                    .sort({ '_id': -1 }).exec(function (err, doc) {
                        if (err) {
                            console.log(err);
                            res.send({
                                msg: 0,
                                data: err
                            })
                        } else {
                            res.send({
                                msg: 200,
                                data: doc
                            })
                        }
                    });
                break;
            case 'title':
                BlogMoel.find({}).skip(skipnum).limit(pageSize)
                    .sort({ 'title': 1 }).exec(function (err, doc) {
                        if (err) {
                            console.log(err);
                            res.send({
                                msg: 0,
                                data: err
                            })
                        } else {
                            res.send({
                                msg: 200,
                                data: doc
                            })
                        }
                    });
                break;
            case 'search':
                if (searchValue) {
                    BlogMoel.find({
                        title: new RegExp(searchValue, "i")
                    }).skip(skipnum).limit(pageSize)
                        .sort({ '_id': -1 }).exec(function (err, doc) {
                            if (err) {
                                console.log(err);
                                res.send({
                                    msg: 0,
                                    data: err
                                })
                            } else {
                                res.send({
                                    msg: 200,
                                    data: doc
                                })
                            }
                        });

                } else {
                    res.send({
                        msg: 200,
                        data: []
                    })
                }
                break;
            default:
                res.send({
                    msg: 0,
                    data: 'unkonw'
                })
                break;
        }
    },
    findBlog(req, res) {
        let { id } = req.body;
        BlogMoel.findOne({ id }, (err, doc) => {
            if (err) {
                console.log(err);
                res.send({
                    msg: 0,
                    data: err
                });
            } else {
                res.send({
                    msg: 200,
                    data: doc
                });
            }
        });
    },
    selectComment(req, res) {
        let { blogid } = req.body;
        async function show() {
            try {
                let CommentModelResult = await CommentModel.find({
                    BlogID:blogid
                }, (err, doc) => {
                    if (err) {
                        throw err;
                    } else {
                        return doc;
                    }
                });
                res.send({
                    msg:200,
                    data:CommentModelResult
                });
            } catch (error) {
                console.log(error);
                res.send({
                    msg: 0,
                    data: error
                })
            }
        }
        show();
    },
    addComment(req, res) {
        let commentModle = new CommentModel(req.body);
        commentModle.save((err) => {
            if (err) {
                console.log('评论失败' + err);
                res.send({
                    msg: 0,
                    data: '评论失败'
                })
            } else {
                res.send({
                    msg: 200,
                    data: '评论成功'
                })
            }
        });
    },
    addChildComment(req, res) {
        let { id, Child } = req.body;
        CommentModel.updateOne({ id }, { $push: {Child:Child} }, (err, doc) => {
            if(err){
                console.log(err);
                res.send({
                    msg:0,
                    data:'评论失败'
                })
            }else{
                res.send({
                    msg:200,
                    data:'评论成功'
                })
            }
        })
    }
}

module.exports = handle;
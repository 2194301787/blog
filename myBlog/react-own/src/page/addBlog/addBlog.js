import React, { Component } from 'react';
import Nav from '../../public/nav/nav';
import { Button, Input, message } from 'antd';
import {BaseUrl} from '../../component/baseURL';
import E from 'wangeditor';
import Ajax from '../../component/ajax';
import moment from 'moment';

import './addBlog.css';
import './addBlogPhone.css';

class AddBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Blog: '',
            title: ''
        }
        this.submit = this.submit.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    submit(e) {
        let _self = this;
        // console.log(this.state.title + '\n' + this.state.Blog);
        if (this.state.title) {
            Ajax.post('/addBlog', {
                title: _self.state.title,
                content: _self.state.Blog,
                createTime : moment().format('YYYY-MM-DD HH:mm:ss')
            }).then(res => {
                if (res.data.msg === 200) {
                    message.success(res.data.data);
                } else {
                    message.info(res.data.data);
                }
            }).catch(err => { console.log(err) });
        } else {
            message.info('请填写文章标题');
        }
    }
    inputChange(e) {
        let val = e.target.value;
        this.setState(() => ({
            title: val
        }));
    }
    componentDidMount() {
        this.initEditor();
    }
    initEditor() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        let _self = this;

        this.editor = editor;

        editor.customConfig.zIndex = 100;
        // 限制一次最多上传 1 张图片
        editor.customConfig.uploadImgMaxLength = 1;
        editor.customConfig.uploadImgServer = '/uploadBlogImg';

        editor.customConfig.customUploadImg = function (files, insert) {
            if (files[0]) {
                const formData = new window.FormData();
                formData.append('myBlog', files[0]);
                Ajax({
                    method: 'post',
                    url: '/uploadBlogImg',
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(res => {
                    if (res.data.msg === 200) {
                        let src = BaseUrl+'/myBlog/' + res.data.filename;
                        insert(src);
                    } else {
                        message.error('上传图片失败');
                    }
                }).catch(err => { console.log(err) });
            }
        }
        editor.customConfig.menus = [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        editor.customConfig.lang = {
            '设置标题': 'Title',
            '字号': 'Size',
            '文字颜色': 'Color',
            '设置列表': 'List',
            '有序列表': '',
            '无序列表': '',
            '对齐方式': 'Align',
            '靠左': '',
            '居中': '',
            '靠右': '',
            '正文': 'p',
            '链接文字': 'link text',
            '链接': 'link',
            '上传图片': 'Upload',
            '网络图片': 'Web',
            '图片link': 'image url',
            '插入视频': 'Video',
            '格式如': 'format',
            '上传': 'Upload',
            '创建': 'init'
        };
        editor.customConfig.onchange = function (html) {
            // html 即变化之后的内容
            _self.setState(() => ({
                Blog: html
            }));
        }
        editor.create();
    }
    render() {
        return (
            <div className="addBlog-page">
                <Nav />
                <h2 className="addBlog-title">添加文章</h2>
                <Input onChange={this.inputChange} style={{
                    marginLeft: '2.5%',
                    marginBottom: 30,
                    width: '25%'
                }} addonBefore="文章标题:" defaultValue='' />
                <div ref='editorElem' style={{
                    position: 'relative',
                    width: '95%',
                    textAlign: 'left',
                    margin: 'auto'
                }} />
                <Button onClick={this.submit} style={{
                    marginLeft: '2.5%',
                    marginTop: 25,
                    width: 100
                }} size="large" type='primary'>确认</Button>
                
            </div>
        )
    }
}

export default AddBlog;
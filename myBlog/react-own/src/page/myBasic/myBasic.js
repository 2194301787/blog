import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Nav from '../../public/nav/nav';
import { Icon, Row, Col, Form, Input, DatePicker, Button, Upload, Avatar, message } from 'antd';
import { uploadAvatar, UpdateUser } from '../../store/action';
import moment from 'moment';
import Ajax from '../../component/ajax';
import {BaseUrl} from '../../component/baseURL';

import './myBasic.css';
import './myBasic.Phone.css';

class MyBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            birthday: '',
            email: ''
        }
    }
    handleSubmit = (e) => {
        let _self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, phone, birthday, email } = values;
                let userData = {
                    username: username,
                    phone: phone,
                    birthday: moment(birthday['_d']).format('YYYY-MM-DD'),
                    email: email,
                    status: true,
                    myAvatar: _self.props.uploadMyAvatar?_self.props.uploadMyAvatar:_self.props.myAvatar
                }
                Ajax.post('/updateUser', userData).then(res => {
                    if (res.data.msg === 200) {
                        message.success(res.data.data);
                        _self.props.UpdateUser(userData);
                    } else {
                        message.err(res.data.data);
                    }
                }).catch(err => { console.log(err) });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const { username, phone, birthday, email, myAvatar } = this.props;

        const _self = this;

        const config = {
            rules: [{ type: 'object', required: true, message: '请选择出生日期' }],
        };
        const formItemLayout = {
            labelCol: {
                sm: { span: 1 }
            },
            wrapperCol: {
                sm: { span: 12 }
            },
        };
        const uploadProps = {
            name: 'MyAvatar',
            action: BaseUrl+'/upload',
            headers: {
                authorization: 'authorization-text',
            },
            withCredentials: true,
            onChange(info) {
                // if (info.file.status !== 'uploading') {
                //     console.log(info.file, info.fileList);
                // }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传图片成功`);
                    _self.props.uploadAvatar(`myAvatar/${username}-${info.file.name}`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传图片失败.`);
                }
            },
        };
        if (this.props.status) {
            return (
                <div className='MyBasic-page'>

                    <Nav />

                    <Row style={{
                        position: 'relative',
                        top: 111,
                        width: '90%',
                        margin: 'auto'
                    }}>
                        <Col sm={{
                            span:8
                        }} xs={{
                            span:24
                        }}>
                            <ul className="MyBasic-left-ul">
                                <li>
                                    <Link to="/myBasic">
                                        <Icon style={{
                                            color: 'rgb(192, 192, 192)',
                                            fontSize: 35
                                        }} type="profile" theme="filled" />
                                        <span>个人资料</span>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col sm={{
                            offset:1,
                            span:15
                        }} xs={{
                            span:24
                        }}>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    <Avatar size={64} icon="user" src={`${BaseUrl}/${myAvatar}`} />
                                    <Upload {...uploadProps} multiple={false} accept="image/*" listType="picture">
                                        <Button>
                                            <Icon type="upload" /> 更换头像
                                        </Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="用户名:">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请填写用户名' }],
                                        initialValue: username
                                    })(
                                        <Input onBlur={this.checkUser} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                    )}
                                </Form.Item>
                                <Form.Item label="邮箱:">
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: '请填写邮箱' }],
                                        initialValue: email
                                    })(
                                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="邮箱" />
                                    )}
                                </Form.Item>
                                <Form.Item label="手机号:">
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            { required: true, message: '请填写手机号' },
                                            { pattern: /^1[34578]\d{9}$/ , message: '请填写正确的手机号' }
                                        ],
                                        initialValue: phone
                                    })(
                                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="出生日期:"
                                >
                                    {getFieldDecorator('birthday', {
                                        config,
                                        initialValue: moment(birthday, 'YYYY-MM-DD')
                                    })(
                                        <DatePicker format="YYYY-MM-DD" placeholder="请选择时间" />
                                    )}
                                </Form.Item>
                                <Button size='large' className="register-submit" type="primary" htmlType="submit">
                                    保存
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <Redirect to='/login' />
            )
        }

    }
}

export default connect((state) => ({
    status: state.user.status,
    username: state.user.username,
    phone: state.user.phone,
    birthday: state.user.birthday,
    email: state.user.email,
    myAvatar: state.user.myAvatar,
    uploadMyAvatar: state.uploadMyAvatar,
}), {
        uploadAvatar,
        UpdateUser
    })(Form.create()(MyBasic));
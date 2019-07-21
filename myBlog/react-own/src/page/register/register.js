import React, { Component } from 'react';
import {
    Form, Icon, Input, DatePicker, Button, message
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { JSEncrypt } from 'jsencrypt'
import './register.css';
import Ajax from '../../component/ajax';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regist: false
        }
        this.checkUser = this.checkUser.bind(this);
    }
    checkUser(e) {
        let user = e.target.value,
            _self = this;
        Ajax.post('/findUser', {
            username: user
        }).then(res => {
            if (res.data.msg === 200) {
                _self.setState(() => ({
                    regist: false
                }), () => {
                    message.error('该用户已被注册');
                });
            } else {
                _self.setState(() => ({
                    regist: true
                }));
            }
        }).catch(err => { console.log(err) });
    }
    handleSubmit = (e) => {
        let _self = this;
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(_self.props.publicPem);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (_self.state.regist) {
                    Ajax.post('/register', {
                        username: values.username,
                        password: encrypt.encrypt(values.password),
                        phone: values.phone,
                        birthday: values.birthday.format('YYYY-MM-DD'),
                        email: values.email
                    }).then(res => {
                        if (res.data.msg === 200) {
                            _self.setState(() => ({
                                regist: false
                            }), () => {
                                message.success('注册成功,请返回登陆');
                            });
                        } else {
                            message.err(res.data.data);
                        }
                    }).catch(err => { console.log(err) });
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: [{ type: 'object', required: true, message: '请选择出生日期' }],
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className='register-page'>
                <div className='register'>
                    <Link to='/login'>返回登陆</Link>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="用户名:">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请填写用户名' }],
                            })(
                                <Input onBlur={this.checkUser} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                        <Form.Item label="密码:">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请填写密码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                        <Form.Item label="邮箱:">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请填写邮箱' }],
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
                            })(
                                <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="出生日期:"
                        >
                            {getFieldDecorator('birthday', config)(
                                <DatePicker placeholder="请选择时间" />
                            )}
                        </Form.Item>
                        <Button size='large' className="register-submit" type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect((state => ({
    publicPem: state.publicPem
})), null)(Form.create()(Register)); 
import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { Link } from 'react-router-dom';
import ProTypes from 'prop-types';
import { getUser } from '../../store/action';
import { connect } from 'react-redux';
import Ajax from '../../component/ajax';
import { JSEncrypt } from 'jsencrypt'
import './login.css';


class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let _self = this;
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(_self.props.publicPem);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Ajax.post('/login', {
                    username: values.userName,
                    password: encrypt.encrypt(values.password)
                }).then((res) => {
                    if (res.data.msg === 200) {
                        let userObj = {
                            username: res.data.data.username,
                            phone: res.data.data.phone,
                            birthday: res.data.data.birthday,
                            email: res.data.data.email,
                            myAvatar: res.data.data.myAvatar,
                            status: true
                        }
                        message.success(`欢迎您${userObj.username}`);
                        _self.props.getUser(userObj);
                        const { from } = _self.props.location.state || { from: { pathname: "/" } };
                        if (_self.props.status) {
                            _self.props.history.push(from);
                        }
                    } else if (res.data.msg === 1) {
                        message.error(res.data.data);
                    } else {
                        message.error(res.data.data);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <div className="login-page">
                    <h3>登陆</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入姓名' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <Link to='/' className="login-form-forgot">忘记密码</Link>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                        </Button>
                            Or &nbsp;<Link to='/register'>注册</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

Login.ProTypes = {
    getUser: ProTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    status: state.user.status,
    publicPem: state.publicPem
});


export default connect(mapStateToProps, { getUser })(Form.create()(Login));
import React, { Component } from 'react';
import {
    Button, Anchor, Dropdown, Menu, Icon, message, Avatar, Badge
} from 'antd';
import ProTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Logout } from '../../store/action';
import Ajax from '../../component/ajax';
import { BaseUrl } from '../../component/baseURL';

import './nav.css';
import './navPhone.css';

const LinkAntd = Anchor.Link;

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: 'transparent',
            top: '15%',
            urlName: '/'
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    handleMenuClick(e) {
        let key = parseInt(e.key);
        switch (key) {
            case 3:
                this.logout();
                break;
            default:
                break;
        }
    }
    logout() {
        let _self = this;
        Ajax.post('/logout').then(res => {
            if (res.data.msg === 200) {
                _self.props.Logout({
                    username: '',
                    status: false
                });
                message.success('欢迎再次登陆');
            }
        }).catch(err => { console.log(err) });
    }
    componentDidMount() {
        let _self = this;
        let url = _self.props.location.pathname;
        _self.setState(() => ({
            urlName: url
        }), () => {
            if (url !== "/") {
                _self.setState(() => ({
                    background: 'rgba(72,60,50,0.8)',
                    top: '0%'
                }));
            }
            window.onscroll = function (e) {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 50 && url === "/") {
                    _self.setState(() => ({
                        background: '#252a33',
                        top: '0%'
                    }));
                } else {
                    if (url === "/") {
                        _self.setState(() => ({
                            background: 'transparent',
                            top: '15%'
                        }));
                    }
                }
            }
        })
    }
    componentWillUnmount() {
        window.onscroll = null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isLogin !== nextProps.isLogin || this.state.urlName !== nextState.urlName || this.props.getUsername !== nextProps.getUsername) {
            return true;
        } else {
            if (nextState.background === this.state.background) {
                return false;
            }
        }
        return true;
    }
    render() {
        let { getUsername, isLogin, myAvatar } = this.props;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Link to="/aboutMe">关于我</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/myBasic">个人设置</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/addBlog">添加文章</Link></Menu.Item>
                <Menu.Item key="3">注销</Menu.Item>
            </Menu>
        );
        return (
            <div style={{
                background: this.state.background,
                top: this.state.top
            }}
                className="Nav-page">
                <div className="nav-left">
                    <Link to="/"> <Badge count={0}><Avatar size='large' src={`${BaseUrl}/${myAvatar}`} icon="user" /></Badge></Link>
                    <Link id="phone-show" to='/'>Welcome {getUsername ? getUsername : ", 您还未登陆"}</Link>
                </div>
                <div className='nav-right'>
                    <div className='nav-right-ul'>
                        <Anchor>
                            <LinkAntd title='FIND' href='#Summarize-index-title' />
                            <LinkAntd title='未开放' href='#' />
                        </Anchor>
                    </div>
                    <div className="nav-right-regist">
                        {isLogin ?
                            <Dropdown overlay={menu}>
                                <Button>
                                    功能 <Icon type="down" />
                                </Button>
                            </Dropdown>
                            :
                            <Link to='/login'>去登陆</Link>}
                    </div>
                </div>
            </div>
        )
    }
}

Nav.ProTypes = {
    getUsername: ProTypes.string,
    isLogin: ProTypes.bool,
    myAvatar: ProTypes.string
}

const mapStateToProps = (state) => ({
    getUsername: state.user.username,
    isLogin: state.user.status,
    myAvatar: state.user.myAvatar
});



export default connect(mapStateToProps, {
    Logout
})(withRouter(Nav));
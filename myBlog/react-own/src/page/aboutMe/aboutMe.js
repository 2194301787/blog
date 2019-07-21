import React, { Component } from "react";
import { Avatar, Icon } from 'antd';
import Nav from '../../public/nav/nav';
import myAvatar from '../../static/images/avatar.jpg';

import './aboutMe.css';
import './aboutMePhone.css';

class AboutMe extends Component {
    render() {
        return (
            <div className="aboutMe-page">
                <Nav />
                <div className="aboutMe">
                    <div className='aboutMe-top'>
                        <h3>Sam</h3>
                        <Avatar style={{
                            position: 'relative',
                            top: -15
                        }} src={myAvatar} size='large' />
                        <h4>前端工程师</h4>
                    </div>
                    <div className='aboutMe-bottom'>
                        <p>
                            毕业于某不知名专科学院,
                            熟练html/css、javascript、jquery、node.js、webpack、three.js、canvas、react全家桶、mongoseDB、微信小程序。
                        </p>
                        <div className="myEmail">
                            <Icon style={{
                                fontSize: '20px',
                                color: '#08c',
                                marginRight:5,
                                verticalAlign:'middle'
                            }} type="mail" />
                            2194301787@qq.com
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutMe;
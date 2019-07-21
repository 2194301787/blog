import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LimitBlog from './limitBlog';
import {Link} from 'react-router-dom';
import Nav from '../../public/nav/nav';
import './selectBlog.css';
import './selectBlogPhone.css';

class SelectBlog extends Component {
    render() {
        return (
            <div className="selectBlog-page">
                <Nav />
                <Row>
                    <Col sm={{
                        span:5
                    }}  xs={{
                        span:24
                    }}>
                        <div className="selectBolg-left">
                            <h2>文章功能</h2>
                            <ul>
                                <li><Link to='/blog'>暂未开放</Link></li>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={{
                        offset:1,
                        span:18
                    }} xs={{
                        span:24
                    }}>
                        <LimitBlog/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SelectBlog;
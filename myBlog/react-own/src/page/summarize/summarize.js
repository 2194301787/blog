import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {MyDemoURL} from '../../component/baseURL';
import findPlace from '../../static/images/find-place.jpg';
import findPlace1 from '../../static/images/find-place2.jpg';
import findPlace2 from '../../static/images/find-place3.jpg';
import findPlace3 from '../../static/images/find-place4.jpg';
import findPlace4 from '../../static/images/find-place5.jpg';

import './summarize.css';
import './summarizePhone.css';

class Summarize extends Component {
    render() {
        return (
            <div className="Summarize-page">
                <div className="Summarize-index-title">
                    <h3 id="Summarize-index-title">What do you need to find?</h3>
                </div>
                <Row gutter={16} type='flex'>
                    <Col sm={8}>
                        <a target="true" href={MyDemoURL}>
                            <div className="Summarize-bgText">
                                <img alt='' src={findPlace} />
                                <div className='Summarize-title'>
                                    <h3>个人项目</h3>
                                    <p>Look</p>
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col sm={8}>
                        <div className="Summarize-bgTextTwo">
                            <Link style={{height:'380px'}} to='/blog'>
                                <div className="Summarize-top-one">
                                    <img alt='' src={findPlace1} />
                                    <div className='Summarize-title'>
                                        <h3>文章</h3>
                                        <p>Look</p>
                                    </div>
                                </div>
                            </Link>
                            <Link style={{height:'200px'}} to='/chat'>
                                <div className="Summarize-bottom-one">
                                    <img alt='' src={findPlace2} />
                                    <div className='Summarize-title'>
                                        <h3>聊天</h3>
                                        <p>Look</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="Summarize-bgTextTwo">
                            <Link style={{height:'200px'}} to='/'>
                                <div className="Summarize-top-two">
                                    <img alt='' src={findPlace3} />
                                    <div className='Summarize-title'>
                                        <h3>暂未开放</h3>
                                        <p>Look</p>
                                    </div>
                                </div>
                            </Link>
                            <Link style={{height:'380px'}} to='/'>
                                <div className="Summarize-bottom-two">
                                    <img alt='' src={findPlace4} />
                                    <div className='Summarize-title'>
                                        <h3>暂未开放</h3>
                                        <p>Look</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Summarize;
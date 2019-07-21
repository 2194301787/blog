import React, { Component } from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import Ajax from '../../component/ajax';
import Nav from '../../public/nav/nav';
import moment from 'moment';
import Comments from '../comment/comment';

import './detailBlog.css';

class DetailBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: {}
        }
    }
    componentDidMount() {
        let _self = this;
        Ajax.post('/findBlog', {
            id: _self.props.match.params.id
        }).then(res => {
            if (res.data.msg === 200) {
                _self.setState(() => ({
                    blog: res.data.data
                }));
            } else {
                message.error('获取失败');
            }
        }).catch(err => { console.log(err) });
    }
    render() {
        let { content, title, createTime } = this.state.blog;
        return (
            <div className="DetailBlog-page">
                <Nav />
                <div style={{
                    marginTop: 120,
                    padding: 30
                }} className='DetailBlog'>
                    <h3 style={{
                        fontSize:25,
                        textAlign:'center'
                    }}>{title}</h3>
                    <p style={{
                        textAlign:'center',
                        marginBottom:30
                    }}>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <div dangerouslySetInnerHTML={{
                        __html: content
                    }}></div>
                </div>
                <Comments/>
            </div>
        )
    }
}

export default withRouter(DetailBlog);
import React, { Component } from 'react';
import 'moment/locale/zh-cn';
import {
    Comment, Avatar, Form, Button, Input, message, Tooltip
} from 'antd';
import { withRouter } from 'react-router-dom';
import { InitComment } from '../../store/action';
import { BaseUrl } from '../../component/baseURL';
import { connect } from 'react-redux';
import moment from 'moment';
import Ajax from '../../component/ajax';

import './comment.css';

moment.locale("zh-cn");
const TextArea = Input.TextArea;
const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    评论
                </Button>
            </Form.Item>
        </div>
    );


class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            value: '',
            id: this.props.match.params.id,
            replayData: {},
            change: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reply = this.reply.bind(this);
    }
    componentDidMount() {
        this.props.InitComment(this.state.id);
    }
    reply(e) {
        let _self = this;
        let data = {
            user: e.target.dataset.user,
            index: e.target.dataset.index,
            myi: e.target.dataset.myi,
        }
        this.setState((prevSate) => ({
            replayData: data,
            change: !prevSate.change
        }), () => {
            _self.setState(() => ({
                value: _self.state.change ? '' : `(${_self.props.username} to ${data.user}): `,
            }));
        });
    }
    handleChange(e) {
        let val = e.target.value;
        this.setState(() => ({
            value: val
        }));
    }
    handleSubmit(e) {
        let _self = this;
        if (!this.props.username) {
            message.info('请登录');
            return;
        }
        if (!this.state.value) {
            message.info('请填写内容');
            return;
        }
        _self.setState(() => ({
            submitting: true
        }), () => {
            if (_self.state.change) {
                Ajax.post('/addComment', {
                    author: _self.props.username,
                    avatar: _self.props.myAvatar,
                    content: _self.state.value,
                    BlogID: _self.state.id,
                    datetime : moment().format("YYYY-MM-DD HH:mm:ss")
                }).then(res => {
                    if (res.data.msg === 200) {
                        _self.setState(() => ({
                            submitting: false,
                            value: ''
                        }), () => {
                            message.success(res.data.data);
                            _self.props.InitComment(_self.state.id);
                        });
                    } else {
                        message.error(res.data.data);
                    }
                }).catch(err => { console.log(err) });
            } else {
                Ajax.post('/addChildComment', {
                    id: _self.state.replayData.myi,
                    Child: {
                        author: _self.props.username,
                        avatar: _self.props.myAvatar,
                        content: _self.state.value,
                        forID: _self.state.replayData.index,
                        toAuthor: _self.state.replayData.user,
                        datetime : moment().format("YYYY-MM-DD HH:mm:ss")
                    }
                }).then(res => {
                    if (res.data.msg === 200) {
                        _self.setState(() => ({
                            submitting: false,
                            value: ''
                        }), () => {
                            message.success(res.data.data);
                            _self.props.InitComment(_self.state.id);
                        });
                    } else {
                        message.error(res.data.data);
                    }
                }).catch(err => console.log(err));
            }

        });
    }
    render() {
        let _self = this;
        const { submitting, value } = this.state;
        const { myAvatar, comments, username } = this.props;
        return (
            <div className="Comment-page">
                {comments.map((item) => {
                    return (
                        <Comment
                            key={item.id}
                            actions={
                                [
                                    <span data-myi={item.id} data-index={item.id} data-user={item.author} onClick={_self.reply}>回复</span>,
                                ]
                            }
                            author={<span>{item.author}</span>}
                            avatar={(
                                <Avatar
                                    src={`${BaseUrl}/${item.avatar}`}
                                    alt={item.author}
                                />
                            )}
                            datetime={(
                                <Tooltip title={moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(item.datetime).fromNow()}</span>
                                </Tooltip>
                            )}
                            content={<p>{item.content}</p>}
                        >
                            {item.Child.map((i) => {
                                return (
                                    <Comment
                                        key={i.id}
                                        actions={[<span data-myi={item.id} data-index={i.id} data-user={i.author} onClick={_self.reply}>回复</span>]}
                                        author={<span>{`${i.author} 回复:${i.toAuthor}`}</span>}
                                        avatar={(
                                            <Avatar
                                                src={`${BaseUrl}/${i.avatar}`}
                                                alt={i.author}
                                            />
                                        )}
                                        content={<p>{i.content}</p>}
                                        datetime={(
                                            <Tooltip title={moment(i.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                                <span>{moment(i.datetime).fromNow()}</span>
                                            </Tooltip>
                                        )}
                                    >
                                    </Comment>
                                )
                            })}
                        </Comment>
                    )
                })}
                <div className="Comment-send">
                    <Comment
                        avatar={(
                            <Avatar
                                src={`${BaseUrl}/${myAvatar}`}
                                alt={username}
                            />
                        )}
                        content={(
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={submitting}
                                value={value}
                            />
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    myAvatar: state.user.myAvatar,
    comments: state.CommentARR,
    username: state.user.username
}), {
        InitComment
    })(withRouter(Comments));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from '../../public/nav/nav';
import E from 'wangeditor';
import { Row, Col, Avatar, Button, message } from 'antd';
import socket from '../../component/socket';
import { BaseUrl } from '../../component/baseURL';

import './chat.css';

//https://www.webfx.com/tools/emoji-cheat-sheet


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersObj: {},
            userChat: [],
            selectPeople : '全部',
            isUser : ''
        }
        this.sendChat = this.sendChat.bind(this);
        this.changePeople = this.changePeople.bind(this);
        this.backChange = this.backChange.bind(this);
    }
    componentDidMount() {
        if (this.props.username) {
            let _self = this;
            _self.setState(()=>({
                isUser : _self.props.username
            }),()=>{
                _self.initEditor();
                socket.open();
    
                socket.on('connect', () => {
                    socket.emit('userConnect', _self.props.userobj);
                });
    
                socket.on("sendPublicChat", (data) => {
                    _self.setState((prevState) => ({
                        userChat: [...prevState.userChat,data]
                    }));
                });
    
                socket.on("to"+_self.props.username,(data)=>{
                    _self.setState((prevState) => ({
                        userChat: [...prevState.userChat,data]
                    }));
                });
    
                socket.on('userObj', (data) => {
                    _self.setState(() => ({
                        usersObj: data
                    }));
                });
    
                window.onbeforeunload = function(e){
                    socket.emit('userDiscount', _self.props.username);
                    socket.removeAllListeners();
                    socket.close();
                }
            })
        }
    }
    componentWillUnmount() {
        socket.emit('userDiscount', this.state.isUser);
        socket.removeAllListeners();
        socket.close();
        window.onbeforeunload = null;
    }
    backChange(e){
        this.setState(()=>({
            selectPeople : "全部"
        }));
    }
    changePeople(e){
        let _self = this,
            people = e.target.dataset.people;
        if(people===this.props.username){
            message.info('不能对自己聊天');
        }else{
            _self.setState(()=>({
                selectPeople : people
            }));
        }
    }
    sendChat(e) {
        let data = {
            user: this.props.userobj,
            chat: this.editor.txt.html(),
            private : false
        }
        if(this.state.selectPeople==='全部'){
            data.private = false;
            socket.emit("publicChat", data);
        }else{
            data.private = true;
            data.to = this.state.selectPeople;
            socket.emit("privateChat",data);
        }
        this.editor.txt.clear();
    }
    initEditor() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);

        this.editor = editor;

        editor.customConfig.zIndex = 100;

        editor.customConfig.menus = [
            'emoticon' // 表情
        ];
        editor.create();
    }
    render() {
        let { username } = this.props;
        let { usersObj, userChat, selectPeople } = this.state;
        if (username) {
            return (
                <div className="chat-page">
                    <Nav />
                    <div className="chat">
                        <Row>
                            <Col sm={{
                                span: 6
                            }}>
                                <div className="chat-let">
                                    <h3>在线人数 {Object.keys(usersObj).length}&nbsp;(选人私聊)</h3>
                                    <ul>
                                        {Object.keys(usersObj).map(item => {
                                            return (
                                                <li key={item}>
                                                    <Avatar style={{
                                                        cursor: 'pointer'
                                                    }} size="default" src={`${BaseUrl}/${usersObj[item].myAvatar}`} />
                                                    <span data-people={item} onClick={this.changePeople} className="chat-name">{item}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Col>

                            <Col sm={{
                                span: 16,
                                offset: 2
                            }}>
                                <div className="chat-right">
                                    <h3 onClick={this.backChange}>{selectPeople} {selectPeople==="全部"?"":"点击返回全部"}</h3>
                                    <div className="chat-right-content">
                                        <ul>
                                            {userChat.map((item,index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className={`chat-right-av ${item.user.username===username?"chat-float-right":"chat-float-left"} ${item.private?"chat-private":""}`}>
                                                            <Avatar style={{
                                                                cursor: 'pointer'
                                                            }} size="large" src={`${BaseUrl}/${item.user.myAvatar}`} />
                                                            <p className="chat-right-p" dangerouslySetInnerHTML={{
                                                                __html: item.chat
                                                            }} />
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="send-chat">
                                    <div className="chat-message">
                                        <div className="chat-editor" ref='editorElem' />
                                        <Button onClick={this.sendChat} style={{
                                            position: 'absolute',
                                            bottom: 40,
                                            left: 25,
                                            zIndex: 999
                                        }}>发送</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to='/login' />
            )
        }
    }
}

export default connect(state => ({
    username: state.user.username,
    userobj: state.user
}), null)(Chat);
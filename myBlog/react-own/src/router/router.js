import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import asyncComponent from '../component/asyncComponent';
import { publicPem,getLoginStatus } from '../store/action';
import {connect} from 'react-redux';


const Home = asyncComponent(() => import("../page/home/home"));
const Login = asyncComponent(() => import("../page/login/login"));
const Register = asyncComponent(() => import("../page/register/register"));
const AboutMe = asyncComponent(()=> import("../page/aboutMe/aboutMe"));
const MyBasic = asyncComponent(()=> import("../page/myBasic/myBasic"));
const AddBlog = asyncComponent(()=> import("../page/addBlog/addBlog"));
const SelectBlog = asyncComponent(()=> import("../page/selectBlog/selectBlog"));
const DetailBlog = asyncComponent(()=> import("../page/detailBlog/detailBlog"));
const Chat = asyncComponent(()=> import("../page/chat/chat"));

class Router extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : false
        }
    }
    componentDidMount(){
        let _self = this;
        async function show(){
            await _self.props.publicPem();
            await _self.props.getLoginStatus();  
            await _self.setState(()=>({
                isLoading : true
            }));         
        }
        show();
    }
    render() {
        if(this.state.isLoading){
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/aboutMe" component={AboutMe}/>
                        <Route path="/myBasic" component={MyBasic}/>
                        <Route path="/addBlog" component={AddBlog}/>
                        <Route path="/blog" component={SelectBlog}/>
                        <Route path="/detailBlog/:id" component={DetailBlog}/>
                        <Route path="/chat" component={Chat}/>
                        <Redirect to="/" />
                    </Switch>
                </BrowserRouter>
            )
        }else{
            return null;
        }
    }
}
export default connect(null,{
    publicPem,
    getLoginStatus
})(Router);
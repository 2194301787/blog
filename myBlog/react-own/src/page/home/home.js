import React, { Component } from 'react';
import { Carousel, Button } from 'antd';
import Nav from '../../public/nav/nav';
import Summarize from '../summarize/summarize';
import Footer from '../../public/footer/footer';
import Loading from '../../component/loading';

import './home.css';
import './homePhone.css';

//http://demo.cssmoban.com/cssthemes5/twts_134_listing/index.html?#
//http://139.196.22.226/blog

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        let _self = this;
        setTimeout(() => {
            _self.setState(() => ({
                loading: false
            }));
        }, 150);
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div className="home-page">
                    <Nav />
                    <div className="carouser-box">
                        <Carousel vertical={true} dots={false} draggable={false} autoplay={true}>
                            <div className="banner-bg"></div>
                            <div className="banner-bg banner-bg1"></div>
                        </Carousel>
                        <div className="myHome">
                            <h2 id='wel-phone'>Welcome to my website</h2>
                            <h5>Let's go</h5>
                            <Button href="#Summarize-index-title" icon='arrow-down' size='large'>更多</Button>
                        </div>
                    </div>
                    <Summarize />
                    <Footer />
                </div>
            )
        }
    }
}

export default Home;
import React, { Component } from 'react';
import { Input, Breadcrumb, Icon, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { GetBlog, LoadingBlog, ClearBlog } from '../../store/action';
import moment from 'moment';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import './limitBlog.css';

const Search = Input.Search;

const LoadingBlogs = () => {
    return (
        <Skeleton active />
    )
}

class LimitBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: 'rgba(0, 0, 0, 0.65)',
            color2: 'rgba(0, 0, 0, 0.45)',
            //一页多少条内容
            pageCount: 8,
            //当前页数
            currentPage: 1,
            pageType: 'time'
        }
        this.search = this.search.bind(this);
        this.sortBlog = this.sortBlog.bind(this);
        this.loadingMore = this.loadingMore.bind(this);
    }
    componentDidMount() {
        let _self = this;
        async function show() {
            await _self.props.GetBlog(_self.state.pageCount, _self.state.currentPage, _self.state.pageType);
            await _self.props.LoadingBlog(_self.props.loadingFlag);
        }
        show();
    }
    componentWillUnmount() {
        this.props.ClearBlog();
        this.props.LoadingBlog(false);
    }
    loadingMore(e) {
        let _self = this;
        async function show() {
            await _self.props.LoadingBlog(_self.props.loadingFlag);
            await _self.props.GetBlog(_self.state.pageCount, _self.state.currentPage, _self.state.pageType);
            await _self.props.LoadingBlog(_self.props.loadingFlag);
        }
        _self.setState((prveState) => ({
            currentPage: ++prveState.currentPage
        }), () => {
            show();
        });
    }
    sortBlog(e, type) {
        let _self = this;
        switch (type) {
            case 'time':
                _self.setState(() => ({
                    color1: 'rgba(0, 0, 0, 0.65)',
                    color2: 'rgba(0, 0, 0, 0.45)',
                    pageType: 'time',
                    currentPage: 1
                }), async () => {
                    await _self.props.LoadingBlog(_self.props.loadingFlag);
                    await _self.props.ClearBlog();
                    await _self.props.GetBlog(_self.state.pageCount, _self.state.currentPage, _self.state.pageType);
                    await _self.props.LoadingBlog(_self.props.loadingFlag);
                });
                break;
            case 'title':
                _self.setState(() => ({
                    color1: 'rgba(0, 0, 0, 0.45)',
                    color2: 'rgba(0, 0, 0, 0.65)',
                    pageType: 'title',
                    currentPage: 1
                }), async () => {
                    await _self.props.LoadingBlog(_self.props.loadingFlag);
                    await _self.props.ClearBlog();
                    await _self.props.GetBlog(_self.state.pageCount, _self.state.currentPage, _self.state.pageType);
                    await _self.props.LoadingBlog(_self.props.loadingFlag);
                });
                break;
            default:
                break;
        }
    }
    search(value) {
        let _self = this,
            val = value;
        _self.setState(() => ({
            pageType: 'search',
            currentPage: 1,
        }), () => {
            async function searchInfo() {
                await _self.props.LoadingBlog(_self.props.loadingFlag);
                await _self.props.ClearBlog();
                await _self.props.GetBlog(_self.state.pageCount, _self.state.currentPage, _self.state.pageType, val);
                await _self.props.LoadingBlog(_self.props.loadingFlag);
            }
            searchInfo();
        });
    }
    render() {
        const { color1, color2 } = this.state;
        const { loadingFlag, blogData, isADDBlog } = this.props;
        return (
            <div className="limitBlog-page">
                <div className="limitBlog-top">
                    <div className="limitBlog-sort">
                        <Breadcrumb>
                            <Breadcrumb.Item><i style={{
                                color: color1
                            }} onClick={(e) => { this.sortBlog(e, 'time') }} className="sort">日期</i></Breadcrumb.Item>
                            <Breadcrumb.Item><i style={{
                                color: color2
                            }} onClick={(e) => { this.sortBlog(e, 'title') }} className="sort">标题</i></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="limitBlog-search">
                        <Search
                            placeholder="输入关键字"
                            onSearch={value => { this.search(value) }}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className="show-limitBlog">
                    <ul className="show-limitBlog-ul">
                        {
                            blogData.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <h3><Link to={`/detailBlog/${item.id}`}>{item.title}</Link></h3>
                                        <div className="show-limitBlog-content">
                                            <Icon type="clock-circle" />
                                            <span>{moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        {loadingFlag ? <LoadingBlogs /> : ''}
                    </ul>
                    <Button disabled={!isADDBlog} onClick={this.loadingMore} block>
                        {isADDBlog ? '加载更多' : '已经到底了'}
                    </Button>
                </div>
            </div>
        )
    }
}

LimitBlog.ProTypes = {
    loadingFlag: ProTypes.bool.isRequired
}

export default connect(state => ({
    loadingFlag: state.loadingBlog,
    blogData: state.blogData,
    isADDBlog: state.isADDBlog
}), {
        GetBlog,
        LoadingBlog,
        ClearBlog
    })(LimitBlog);
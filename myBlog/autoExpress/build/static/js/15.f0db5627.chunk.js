(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{116:function(e,t,a){"use strict";a(161);var n=a(169),o=a.n(n),r=(a(96),a(97)),c=a.n(r),l=(a(117),a(88)),s=a.n(l),i=(a(134),a(138)),u=a.n(i),m=(a(162),a(168)),d=a.n(m),g=(a(118),a(120)),p=a.n(g),h=a(12),f=a(13),b=a(16),v=a(14),k=a(21),E=a(15),y=(a(163),a(164)),j=a.n(y),O=a(0),w=a.n(O),N=a(9),M=a.n(N),L=a(31),C=a(11),S=a(22),U=a(24),D=a(23),T=(a(119),j.a.Link),I=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(b.a)(this,Object(v.a)(t).call(this,e))).state={background:"transparent",top:"15%",urlName:"/"},a.handleMenuClick=a.handleMenuClick.bind(Object(k.a)(a)),a}return Object(E.a)(t,e),Object(f.a)(t,[{key:"handleMenuClick",value:function(e){switch(parseInt(e.key)){case 3:this.logout()}}},{key:"logout",value:function(){var e=this;D.a.post("/logout").then(function(t){200===t.data.msg&&(e.props.Logout({username:"",status:!1}),p.a.success("\u6b22\u8fce\u518d\u6b21\u767b\u9646"))}).catch(function(e){console.log(e)})}},{key:"componentDidMount",value:function(){var e=this,t=e.props.location.pathname;e.setState(function(){return{urlName:t}},function(){"/"!==t&&e.setState(function(){return{background:"rgba(72,60,50,0.8)",top:"0%"}}),window.onscroll=function(a){(document.documentElement.scrollTop||document.body.scrollTop)>50&&"/"===t?e.setState(function(){return{background:"#252a33",top:"0%"}}):"/"===t&&e.setState(function(){return{background:"transparent",top:"15%"}})}})}},{key:"componentWillUnmount",value:function(){window.onscroll=null}},{key:"shouldComponentUpdate",value:function(e,t){return this.props.isLogin!==e.isLogin||this.state.urlName!==t.urlName||this.props.getUsername!==e.getUsername||t.background!==this.state.background}},{key:"render",value:function(){var e=this.props,t=e.getUsername,a=e.isLogin,n=e.myAvatar,r=w.a.createElement(d.a,{onClick:this.handleMenuClick},w.a.createElement(d.a.Item,{key:"1"},w.a.createElement(L.b,{to:"/aboutMe"},"\u5173\u4e8e\u6211")),w.a.createElement(d.a.Item,{key:"2"},w.a.createElement(L.b,{to:"/myBasic"},"\u4e2a\u4eba\u8bbe\u7f6e")),w.a.createElement(d.a.Item,{key:"3"},"\u6ce8\u9500"));return w.a.createElement("div",{style:{background:this.state.background,top:this.state.top},className:"Nav-page"},w.a.createElement("div",{className:"nav-left"},w.a.createElement(u.a,{size:"large",src:"http://localhost:8080/".concat(n),icon:"user"}),w.a.createElement(L.b,{to:"/"},"Welcome ",t||", \u60a8\u8fd8\u672a\u767b\u9646")),w.a.createElement("div",{className:"nav-right"},w.a.createElement("div",{className:"nav-right-ul"},w.a.createElement(j.a,null,w.a.createElement(T,{title:"\u5185\u5bb91",href:"#Summarize-index-title"}),w.a.createElement(T,{title:"\u5185\u5bb92",href:"#"}),w.a.createElement(T,{title:"\u5185\u5bb93",href:"#"}))),w.a.createElement("div",{className:"nav-right-regist"},a?w.a.createElement(o.a,{overlay:r},w.a.createElement(c.a,null,"\u529f\u80fd ",w.a.createElement(s.a,{type:"down"}))):w.a.createElement(L.b,{to:"/login"},"\u53bb\u767b\u9646"))))}}]),t}(O.Component);I.ProTypes={getUsername:M.a.string,isLogin:M.a.bool,myAvatar:M.a.string};t.a=Object(S.b)(function(e){return{getUsername:e.user.username,isLogin:e.user.status,myAvatar:e.user.myAvatar}},{Logout:U.e})(Object(C.f)(I))},119:function(e,t,a){},585:function(e,t,a){},597:function(e,t,a){"use strict";a.r(t);a(118);var n=a(120),o=a.n(n),r=a(12),c=a(13),l=a(16),s=a(14),i=a(15),u=a(0),m=a.n(u),d=a(11),g=a(23),p=a(116),h=a(87),f=a.n(h),b=(a(585),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={blog:{}},a}return Object(i.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.post("/findBlog",{id:e.props.match.params.id}).then(function(t){200===t.data.msg?e.setState(function(){return{blog:t.data.data}}):o.a.error("\u83b7\u53d6\u5931\u8d25")}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this.state.blog,t=e.content,a=e.title,n=e.createTime;return m.a.createElement("div",{className:"DetailBlog-page"},m.a.createElement(p.a,null),m.a.createElement("div",{style:{marginTop:120,padding:30},className:"DetailBlog"},m.a.createElement("h3",{style:{fontSize:25}},a),m.a.createElement("p",null,f()(n).format("YYYY-MM-DD HH:mm:ss")),m.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})))}}]),t}(u.Component));t.default=Object(d.f)(b)}}]);
//# sourceMappingURL=15.f0db5627.chunk.js.map
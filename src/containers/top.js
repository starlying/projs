"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const utils = require('../lib/utils');
const actions = require('../actions/authActions');
class Top extends React.Component {
    onForgetPassword(e) {
        utils.DOM.stop(e);
        utils.Page.redirect(utils.Addr.getForgetPasswordUrl());
    }
    onSignup(e) {
        utils.DOM.stop(e);
        this.props.actions.logout();
        const path = `/login`;
        react_router_1.browserHistory.push(path);
    }
    render() {
        const display = this.props.authState.user.userName;
        return (React.createElement("div", {className: "topBg"}, 
            React.createElement("div", {className: "wrapper"}, 
                React.createElement("span", {className: "fl"}, 
                    "你好，", 
                    React.createElement("a", {href: "#", className: "cor_yellow"}, display), 
                    "，欢迎来到中国移动网上党校！"), 
                React.createElement("a", {href: "javascript:;", className: "topOut", onClick: this.onSignup.bind(this)}, "退出登录"), 
                React.createElement("a", {href: "#", className: "top_btn"}, "进入宣传门户"))
        ));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: redux_1.bindActionCreators(actions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Top);
//# sourceMappingURL=top.js.map
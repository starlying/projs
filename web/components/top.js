"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const lang = require('../../lib/lang');
const utils = require('../../lib/utils');
const components_1 = require('../../lib/components');
const form_1 = require('../actions/form');
function mapStateToProps(state) {
    return {
        account: state.form.account,
        password: state.form.password,
        alert: state.form.alert
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators({ login: form_1.login }, dispatch);
}
class Top extends React.Component {
    onForgetPassword(e) {
        utils.DOM.stop(e);
        utils.Page.redirect(utils.Addr.getForgetPasswordUrl());
    }
    onSignup(e) {
        utils.DOM.stop(e);
        utils.Page.redirect(utils.Addr.getSignupUrl());
    }
    render() {
        var alertEl = null;
        if (this.props.alert) {
            alertEl = React.createElement(components_1.Alert, {alert: this.props.alert});
        }
        var accountEl = React.createElement(components_1.Input, {ref: "account", value: this.props.account, placeholder: lang.get('Username or Email'), className: 'email', required: true});
        var passwordEl = React.createElement(components_1.Input, {ref: 'password', placeholder: lang.get('Password'), className: 'password', required: true});
        return (React.createElement("div", {className: "topBg"}, 
            React.createElement("div", {className: "wrapper"}, 
                React.createElement("span", {className: "fl"}, 
                    "你好，", 
                    React.createElement("a", {href: "#", className: "cor_yellow"}, "杜丽梅"), 
                    "，欢迎来到中国移动网上党校！"), 
                React.createElement("a", {href: "/login", className: "topOut"}, "退出登录"), 
                React.createElement("a", {href: "#", className: "top_btn"}, "进入宣传门户"))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Top);
//# sourceMappingURL=top.js.map
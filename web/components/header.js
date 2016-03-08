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
class Header extends React.Component {
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
        return (React.createElement("div", {className: "header"}, 
            React.createElement("a", {className: "logo", href: "#"}, 
                React.createElement("img", {src: "/assets/images/logo.jpg", width: "351", height: "49"})
            ), 
            React.createElement("div", {className: "headSel"}, 
                React.createElement("div", {className: "headNm"}, "中共中国移动通信集团河北有限公司党组  党组书记"), 
                React.createElement("div", {className: "headOption hidden"}, 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "javascript:;"}, "中共中国移动通信集团河北有限公司党组111")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "javascript:;"}, "中共中国移动通信集团河北有限公司党组222")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "javascript:;"}, "中共中国移动通信集团河北有限公司党组333")
                        ))
                ))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Header);
//# sourceMappingURL=header.js.map
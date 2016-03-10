"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const utils = require('../lib/utils');
const components_1 = require('../lib/components');
const actions = require('../actions/authActions');
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
        var accountEl = React.createElement(components_1.Input, {ref: "account", value: this.props.appState.account, className: 'email', required: true});
        var passwordEl = React.createElement(components_1.Input, {ref: 'password', className: 'password', required: true});
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
function mapStateToProps(state) {
    return {
        appState: state.authAppState
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: redux_1.bindActionCreators(actions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Header);
//# sourceMappingURL=header.js.map
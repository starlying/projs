"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const utils = require('../lib/utils');
const components_1 = require('../lib/components');
const actions = require('../actions/authActions');
class Form extends React.Component {
    componentDidMount() {
        var accountNode = ReactDOM.findDOMNode(this.refs["account"]);
        accountNode.focus();
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const account = utils.DOM.getValue(this.refs["account"]);
        const password = utils.DOM.getValue(this.refs["password"]);
        if (account && password) {
            this.props.actions.login(account, password);
        }
    }
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
        return (React.createElement("div", {className: 'console-auth'}, 
            React.createElement("div", {className: 'input-box'}, 
                React.createElement("form", {className: 'container', ref: 'form', onSubmit: this.onSubmit.bind(this)}, 
                    React.createElement("a", {className: 'logo ct-center-block', href: '/'}, 
                        React.createElement("img", {src: utils.Addr.getImgUrl('logo-grey.png')})
                    ), 
                    alertEl, 
                    React.createElement("label", {className: 'login-input'}, 
                        accountEl, 
                        passwordEl), 
                    React.createElement("button", {className: 'ct-btn --block ct-bg-green', onClick: this.onSubmit.bind(this)}, "'Log In'"), 
                    React.createElement("div", {className: 'login-back ct-mt-lg ct-mlr-sm'}, 
                        React.createElement("a", {className: 'ct-fl grey', href: 'javascript:void(0)', onClick: this.onForgetPassword.bind(this)}, "'Forgot password?'"), 
                        React.createElement("a", {className: 'ct-fr red', href: 'javascript:void(0)', onClick: this.onSignup.bind(this)}, "'No account? Sign up'")))
            )
        ));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Form);
//# sourceMappingURL=form.js.map
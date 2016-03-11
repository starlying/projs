"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const components_1 = require('../../lib/components');
const utils = require('../../lib/utils');
const client_1 = require('../../lib/client');
const actions = require('../../actions/authActions');
class LoginPage extends React.Component {
    componentDidMount() {
        var userNameNode = ReactDOM.findDOMNode(this.refs["userName"]);
        userNameNode.focus();
    }
    componentWillReceiveProps(props) {
        if (!props.authState.isAnonymous) {
            const path = `/`;
            react_router_1.browserHistory.push(path);
        }
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const userName = this.refs["userName"]["value"];
        const password = this.refs["password"]["value"];
        if (userName && password) {
            utils.DOM.loading(true);
            client_1.default.users.login(userName, password, (err, res) => {
                utils.DOM.loading(false);
                if (!err) {
                    this.props.actions.login(res.token, res.user);
                    const path = `/`;
                    react_router_1.browserHistory.push(path);
                }
                else {
                    utils.Swal.error({
                        status: 404,
                        message: "登录失败，用户名或者密码不正确"
                    });
                }
            });
        }
    }
    render() {
        return (React.createElement("div", {className: "lgBox"}, 
            React.createElement("div", {className: "lg_hd"}, 
                React.createElement("ul", null, 
                    React.createElement("li", {className: "lg_itm lg_itm1"}, "账号密码登录"), 
                    React.createElement("li", {className: "lg_itm lg_itm2"}, "动态口令登录"), 
                    React.createElement("li", {className: "lg_itm lg_itm3"}, "二维码登录"))
            ), 
            React.createElement("div", {className: "lg_bd"}, 
                React.createElement("form", {className: 'container', ref: 'form', onSubmit: this.onSubmit.bind(this)}, 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("input", {ref: "userName", placeholder: "请输入用户名", className: "lg_int1 lg_int1a", type: "text"}), 
                            React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon1.jpg", width: "30", height: "22"})), 
                        React.createElement("li", null, 
                            React.createElement("input", {ref: "password", className: "lg_int1 lg_int1b", name: "", type: "password"}), 
                            React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon2.jpg", width: "30", height: "22"}))), 
                    React.createElement("a", {href: "javascript:;", className: "lg_btn", onClick: this.onSubmit.bind(this)}, "登录"))
            ), 
            React.createElement("div", {className: "lg_bd hidden"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("input", {placeholder: "请输入用户名", className: "lg_int1 lg_int1a", name: "", type: "text"}), 
                        React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon1.jpg", width: "30", height: "22"})), 
                    React.createElement("li", null, 
                        React.createElement("input", {placeholder: "动态口令", className: "lg_int1 lg_int2 lg_int1d", name: "", type: "text"}), 
                        React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon4.jpg", width: "30", height: "22"}), 
                        React.createElement("a", {href: "#", className: "lg_get"}, "获取动图口令")), 
                    React.createElement("li", null, 
                        React.createElement("input", {placeholder: "验证码", className: "lg_int1 lg_int2 lg_int1c", name: "", type: "text"}), 
                        React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon3.jpg", width: "30", height: "22"}), 
                        React.createElement("a", {className: "lg_vcoder", href: "#"}, 
                            React.createElement("img", {src: "/assets/images/vcoder.jpg", width: "100", height: "32"})
                        ))), 
                React.createElement("a", {href: "/", className: "lg_btn"}, "登录")), 
            React.createElement("div", {className: "lg_bd hidden"}, 
                React.createElement("div", {className: "lg_wx"}, 
                    React.createElement("img", {src: "/assets/images/lg_wx.jpg", width: "134", height: "134"}), 
                    React.createElement("br", null), 
                    "请使用手机扫描二维码登陆")
            ), 
            React.createElement(components_1.Loading, null)));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LoginPage);
//# sourceMappingURL=loginPage.js.map
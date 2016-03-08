"use strict";
const React = require('react');
class LoginPage extends React.Component {
    render() {
        return (React.createElement("div", {className: "lgBox"}, 
            React.createElement("div", {className: "lg_hd"}, 
                React.createElement("ul", null, 
                    React.createElement("li", {className: "lg_itm lg_itm1"}, "账号密码登录"), 
                    React.createElement("li", {className: "lg_itm lg_itm2"}, "动态口令登录"), 
                    React.createElement("li", {className: "lg_itm lg_itm3"}, "二维码登录"))
            ), 
            React.createElement("div", {className: "lg_bd"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("input", {placeholder: "请输入用户名", className: "lg_int1 lg_int1a", name: "", type: "text"}), 
                        React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon1.jpg", width: "30", height: "22"})), 
                    React.createElement("li", null, 
                        React.createElement("input", {className: "lg_int1 lg_int1b", name: "", type: "password"}), 
                        React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon2.jpg", width: "30", height: "22"})), 
                    React.createElement("li", null, 
                        React.createElement("input", {placeholder: "验证码", className: "lg_int1 lg_int2 lg_int1c", name: "", type: "text"}), 
                        React.createElement("img", {className: "lgIcon", src: "/assets/images/lg_icon3.jpg", width: "30", height: "22"}), 
                        React.createElement("a", {className: "lg_vcoder", href: "#"}, 
                            React.createElement("img", {src: "/assets/images/vcoder.jpg", width: "100", height: "32"})
                        ))), 
                React.createElement("a", {href: "/", className: "lg_btn"}, "登录")), 
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
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
//# sourceMappingURL=loginPage.js.map
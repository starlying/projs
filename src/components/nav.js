"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const links = require('../constants/links');
class Nav extends React.Component {
    render() {
        return (React.createElement("div", {className: "nav"}, 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement(react_router_1.IndexLink, {to: links.INDEX, className: "nav_a", activeClassName: "on"}, "首  页")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.PARTY_MEMBERS, className: "nav_a", activeClassName: "on"}, "党员管理")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "nav_a"}, "党委工作")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.ORGS, className: "nav_a", activeClassName: "on"}, "党组织")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.MEMBERS, className: "nav_a", activeClassName: "on"}, "党员发展")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "nav_a"}, "党费管理")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "nav_a"}, "组织生活")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "nav_a"}, "会议管理")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "nav_a"}, "统计查询")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "nav_a"}, "学习发展")
                ))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Nav;
//# sourceMappingURL=nav.js.map
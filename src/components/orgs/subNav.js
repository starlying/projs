"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const links = require('../../constants/links');
class SubNav extends React.Component {
    render() {
        return (React.createElement("div", {className: "m2fmNav"}, 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.ORGS_JG, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "组织架构")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.ORGS, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "组织管理")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.ORGS_HJ, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "换届选举")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "m2fm_a1"}, "领导成员管理")
                ))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubNav;
//# sourceMappingURL=subNav.js.map
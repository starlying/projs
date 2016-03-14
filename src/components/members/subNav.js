"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const links = require('../../constants/links');
class SubNav extends React.Component {
    render() {
        return (React.createElement("div", {className: "m2fmNav"}, 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.MEMBERS, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "申请人管理")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.MEMBERS_JJ, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "积极分子管理")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.MEMBERS_FZ, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "发展对象管理")
                ), 
                React.createElement("li", null, 
                    React.createElement(react_router_1.Link, {to: links.MEMBERS_YB, className: "m2fm_a1", activeClassName: "m2fm_a2"}, "预备党员管理")
                ))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubNav;
//# sourceMappingURL=subNav.js.map
"use strict";
const React = require('react');
class SubNav extends React.Component {
    render() {
        return (React.createElement("div", {className: "m2fmNav"}, 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement("a", {href: "javascript:;", className: "m2fm_a1 m2fm_a2"}, "申请人管理")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "m2fm_a1"}, "积极分子管理")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "m2fm_a1"}, "发展对象管理")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#", className: "m2fm_a1 on"}, "预备党员管理")
                ))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubNav;
//# sourceMappingURL=subNav.js.map
"use strict";
const React = require('react');
class Location extends React.Component {
    render() {
        return (React.createElement("div", {className: "m2pos"}, 
            React.createElement("a", {className: "m2pos_a", href: "#"}, "首页"), 
            ">", 
            React.createElement("a", {className: "m2pos_a", href: "#"}, "二级栏目位置"), 
            ">", 
            React.createElement("span", {className: "m2pos_cut"}, "当前栏目位置")));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Location;
//# sourceMappingURL=location.js.map
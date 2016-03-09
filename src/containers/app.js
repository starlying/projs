"use strict";
const React = require('react');
const components_1 = require('../lib/components');
const top_1 = require("../components/top");
const header_1 = require("../components/header");
const nav_1 = require("../components/nav");
const footer_1 = require("../components/footer");
class App extends React.Component {
    render() {
        return (React.createElement("div", null, 
            React.createElement(top_1.default, null), 
            React.createElement(header_1.default, null), 
            React.createElement(nav_1.default, null), 
            this.props.children, 
            React.createElement(footer_1.default, null), 
            React.createElement(components_1.Loading, null)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=app.js.map
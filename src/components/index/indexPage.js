"use strict";
const React = require('react');
const message_1 = require("./message");
const info_1 = require("./info");
const yewu_1 = require("./yewu");
const banner_1 = require("./banner");
const tongji_1 = require("./tongji");
class IndexPage extends React.Component {
    render() {
        return (React.createElement("div", null, 
            React.createElement(message_1.default, null), 
            React.createElement(info_1.default, null), 
            React.createElement(yewu_1.default, null), 
            React.createElement(banner_1.default, null), 
            React.createElement(tongji_1.default, null)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IndexPage;
//# sourceMappingURL=indexPage.js.map
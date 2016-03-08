"use strict";
const React = require('react');
class Footer extends React.Component {
    render() {
        return (React.createElement("div", {className: "footerBg"}, 
            React.createElement("div", {className: "footer"}, 
                React.createElement("a", {className: "cor_bs", href: "#"}, "联系我们"), 
                "  中国移动网上党校版权所有   京ICP备05938475号")
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
//# sourceMappingURL=footer.js.map
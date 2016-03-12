"use strict";
const React = require('react');
const components_1 = require('../../../lib/components');
const client_1 = require('../../../lib/client');
const form_1 = require("./form");
class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            member: null,
        };
    }
    componentDidMount() {
        client_1.default.members.get(this.props.params.id, (err, res) => {
            if (!err && res) {
                this.setState({
                    isError: false,
                    member: res
                });
            }
            else {
                this.setState({
                    isError: true,
                    member: null
                });
            }
        });
    }
    onClose(e) {
        this.setState({
            isError: false,
            member: this.state.member
        });
    }
    render() {
        if (!this.state.member)
            return React.createElement(components_1.InnerLoading, null);
        let errorEl = null;
        if (this.state.isError) {
            errorEl = (React.createElement("div", null, 
                React.createElement("div", {className: "layerBg"}), 
                React.createElement("div", {className: "layerCon1 layerCon2"}, 
                    React.createElement("i", {className: "layerClose", onClick: this.onClose.bind(this)}), 
                    React.createElement("div", {className: "layer_sbbx2"}, "此人没有党校账号，请联系管理员！"))));
        }
        const formEl = React.createElement(form_1.default, {member: this.state.member});
        return (React.createElement("div", {className: "main2"}, 
            errorEl, 
            React.createElement("div", {className: "m2pos"}, 
                React.createElement("a", {className: "m2pos_a", href: "#"}, "首页"), 
                " > ", 
                React.createElement("a", {className: "m2pos_a", href: "#"}, "二级栏目位置"), 
                " > ", 
                React.createElement("span", {className: "m2pos_cut"}, "当前栏目位置")), 
            formEl));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddPage;
//# sourceMappingURL=editPage.js.map
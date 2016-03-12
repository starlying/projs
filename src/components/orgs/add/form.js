"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const models = require('../../../api/models');
const utils = require('../../../lib/utils');
const client_1 = require('../../../lib/client');
const links = require('../../../constants/links');
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            org: this.props.org || new models.Org()
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            org: nextProps.org || new models.Org()
        });
    }
    onChange(name, e) {
        const org = this.state.org;
        org[name] = e.target.value;
        this.setState({ org: org });
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const org = this.state.org;
        if (org.orgName) {
            utils.DOM.loading(true);
            if (this.props.org) {
                client_1.default.orgs.edit(org, (err, res) => {
                    utils.DOM.loading(false);
                    if (!err) {
                        react_router_1.browserHistory.push(links.ORGS);
                    }
                    else {
                        utils.Swal.error(err);
                    }
                });
            }
            else {
                org.parentID = this.props.parentID;
                client_1.default.orgs.create(org, (err, res) => {
                    utils.DOM.loading(false);
                    if (!err) {
                        react_router_1.browserHistory.push(links.ORGS);
                    }
                    else {
                        utils.Swal.error(err);
                    }
                });
            }
        }
    }
    render() {
        const org = this.state.org;
        const title = this.props.org ? '编辑党组织' : '新建党组织';
        return (React.createElement("div", null, 
            React.createElement("div", {className: "layerBg"}), 
            React.createElement("div", {className: "layerCon1 layerCon3 layerCon3a"}, 
                React.createElement("i", {className: "layerClose", onClick: this.props.onClose.bind(this)}), 
                React.createElement("div", {className: "layer_t"}, title), 
                React.createElement("div", {className: "m2nadBox"}, 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "界数"), 
                            React.createElement("span", {className: "lay_s1a"}, "XXXXXXX 组织")), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "上级组织代码"), 
                            React.createElement("span", {className: "lay_s1a"}, "XXXXXXX00235")), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "党组织编码"), 
                            React.createElement("span", {className: "lay_s1a"}, "XXXXXXX00235")), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "组织名称"), 
                            React.createElement("input", {ref: "organizaName", value: org.orgName, onChange: this.onChange.bind(this, "organizaName"), type: "text", className: "m2fm_int m2fm_int10", name: ""})), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "组织属性"), 
                            React.createElement("div", {className: "m2fm_selContent"}, 
                                React.createElement("input", {type: "text", className: "m2fm_int m2fm_int3", placeholder: "请选择"}), 
                                React.createElement("div", {className: "m2fm_selBox"}, 
                                    React.createElement("dl", null, 
                                        React.createElement("dd", null, "党员"), 
                                        React.createElement("dd", null, "非党员"))
                                ))), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "建立日期"), 
                            React.createElement("input", {type: "text", className: "m2fm_int m2fm_int2 m2fm_int10", name: ""})), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "联系电话"), 
                            React.createElement("input", {type: "text", className: "m2fm_int m2fm_int10", name: ""})), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "通讯地址"), 
                            React.createElement("input", {type: "text", className: "m2fm_int m2fm_int10", name: ""})), 
                        React.createElement("li", null, 
                            React.createElement("span", {className: "lay_s1"}, "建立日期"), 
                            React.createElement("input", {type: "text", className: "m2fm_int m2fm_int2 m2fm_int10", name: ""})))
                ), 
                React.createElement("div", {className: "m2btnBox2"}, 
                    React.createElement("a", {href: "javascript:;", className: "m2btn_a1", onClick: this.onSubmit.bind(this)}, "确 定"), 
                    React.createElement("a", {href: "javascript:;", className: "m2btn_a2", onClick: this.props.onClose.bind(this)}, "取 消")))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Form;
//# sourceMappingURL=form.js.map
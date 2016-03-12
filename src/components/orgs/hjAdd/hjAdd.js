"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const utils = require('../../../lib/utils');
const client_1 = require('../../../lib/client');
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member: this.props.member
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            member: nextProps.member
        });
    }
    onChange(name, e) {
        const member = this.state.member;
        member[name] = e.target.value;
        this.setState({ member: member });
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const userName = this.refs["userName"]["value"];
        const idCardNumber = this.refs["idCardNumber"]["value"];
        if (userName) {
            const member = this.state.member;
            member.userName = userName;
            member.idCardNumber = idCardNumber;
            utils.DOM.loading(true);
            if (this.props.member) {
                client_1.default.members.edit(member, (err, res) => {
                    utils.DOM.loading(false);
                    if (!err) {
                        react_router_1.browserHistory.push("/member");
                    }
                    else {
                        utils.Swal.error(err);
                    }
                });
            }
            else {
                client_1.default.members.create(member, (err, res) => {
                    utils.DOM.loading(false);
                    if (!err) {
                        react_router_1.browserHistory.push("/member");
                    }
                    else {
                        utils.Swal.error(err);
                    }
                });
            }
        }
    }
    render() {
        const member = this.state.member;
        const title = this.props.member ? '新建党组织' : '编辑党组织';
        return (React.createElement("div", null, 
            React.createElement("div", {className: "layerBg"}), 
            React.createElement("div", {className: "layerCon1 layerCon3"}, 
                React.createElement("i", {className: "layerClose"}), 
                React.createElement("div", {className: "layer_t"}, "XX组织XX年第X界换届选举"), 
                React.createElement("div", {className: "lay_sbx"}, 
                    React.createElement("strong", null, "当前组织：XXX党组织"), 
                    "请关联会议："), 
                React.createElement("div", {className: "lay_sbx2"}, 
                    React.createElement("div", {className: "lay_sli"}, 
                        React.createElement("span", {className: "m2fm_s1"}, "会议名称："), 
                        React.createElement("input", {type: "text", name: "", className: "m2fm_int m2fm_int5"})), 
                    React.createElement("div", {className: "lay_sli"}, 
                        React.createElement("span", {className: "m2fm_s1"}, "会议时间："), 
                        React.createElement("input", {type: "text", placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: ""}), 
                        React.createElement("span", {className: "m2fm_ss1 m2fm_ss2"}, "至"), 
                        React.createElement("input", {type: "text", placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: ""})), 
                    React.createElement("input", {value: "", className: "laySubmit", name: "", type: "submit"})), 
                React.createElement("div", {className: "lay_btn1"}, 
                    React.createElement("a", {className: "m2fm_btn1", href: "#"}, "新增换届记录")
                ), 
                React.createElement("div", {className: "lay_sbx3"}, 
                    React.createElement("div", {className: "lay_tab"}, 
                        React.createElement("table", {width: "100%"}, 
                            React.createElement("tbody", null, 
                                React.createElement("tr", {className: "lay_th"}, 
                                    React.createElement("td", {width: "10%"}, 
                                        React.createElement("input", {className: "lay-rad", name: "", type: "radio", value: ""})
                                    ), 
                                    React.createElement("td", {width: "35%"}, "会议名称"), 
                                    React.createElement("td", {width: "21%"}, "会议时间 "), 
                                    React.createElement("td", {width: "34%"}, "组织名称")), 
                                React.createElement("tr", null, 
                                    React.createElement("td", null, 
                                        React.createElement("input", {className: "lay-rad", name: "", type: "radio", value: ""})
                                    ), 
                                    React.createElement("td", null, 
                                        React.createElement("a", {className: "cor_red", href: "#"}, "XXX讨论会")
                                    ), 
                                    React.createElement("td", null, "2016-01-15"), 
                                    React.createElement("td", null, "河南党支部")), 
                                React.createElement("tr", null, 
                                    React.createElement("td", null, 
                                        React.createElement("input", {className: "lay-rad", name: "", type: "radio", value: ""})
                                    ), 
                                    React.createElement("td", null, 
                                        React.createElement("a", {className: "cor_red", href: "#"}, "XXX讨论会")
                                    ), 
                                    React.createElement("td", null, "2016-01-15"), 
                                    React.createElement("td", null, "河南党支部")))
                        )
                    ), 
                    React.createElement("div", {className: "layFm"}, 
                        React.createElement("ul", null, 
                            React.createElement("li", null, 
                                React.createElement("span", {className: "lay_s1"}, "界数"), 
                                React.createElement("input", {className: "m2fm_int", name: "", type: "text"}), 
                                React.createElement("span", {className: "lay_s1"}, "任期年限"), 
                                React.createElement("input", {className: "m2fm_int m2fm_inta", name: "", type: "text"}), 
                                React.createElement("span", {className: "lay_s1"}, "换届时间"), 
                                React.createElement("input", {className: "m2fm_int m2fm_inta m2fm_int2", name: "", type: "text"})), 
                            React.createElement("li", null, 
                                React.createElement("span", {className: "lay_s1"}, "选举形式"), 
                                React.createElement("div", {className: "m2fm_selContent"}, 
                                    React.createElement("input", {type: "text", placeholder: "全部", className: "m2fm_int m2fm_int3"}), 
                                    React.createElement("div", {className: "m2fm_selBox"}, 
                                        React.createElement("dl", null, 
                                            React.createElement("dd", null, "党员"), 
                                            React.createElement("dd", null, "非党员"))
                                    )), 
                                React.createElement("span", {className: "lay_s1"}, "应到会人数"), 
                                React.createElement("input", {className: "m2fm_int m2fm_intb", name: "", type: "text"}), 
                                React.createElement("span", {className: "lay_s1"}, "实到会人数"), 
                                React.createElement("input", {className: "m2fm_int m2fm_intb", name: "", type: "text"})), 
                            React.createElement("li", null, 
                                React.createElement("span", {className: "lay_s1"}, "选举情况"), 
                                React.createElement("textarea", {className: "lay_area", name: ""}), 
                                React.createElement("div", {className: "clear"})))
                    ), 
                    React.createElement("div", null, 
                        React.createElement("a", {href: "#", className: "laySubmit2"}, "确 定")
                    ), 
                    React.createElement("div", {className: "clear"})))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Form;
//# sourceMappingURL=hjAdd.js.map
"use strict";
const React = require('react');
const _ = require('lodash');
const react_router_1 = require('react-router');
const models = require('../../../api/models');
const utils = require('../../../lib/utils');
const client_1 = require('../../../lib/client');
class Form extends React.Component {
    constructor(props) {
        super(props);
        const member = this.props.member ? this.props.member : _.assign(new models.Member(), this.props.user);
        this.state = {
            member: member
        };
    }
    componentWillReceiveProps(nextProps) {
        const member = nextProps.member ? nextProps.member : _.assign(new models.Member(), nextProps.user);
        this.setState({
            member: member
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
        return (React.createElement("div", {className: "m2con2"}, 
            React.createElement("div", {className: "m2c2_t"}, "基础资料表单"), 
            React.createElement("div", {className: "m2upLaod"}, 
                React.createElement("div", {className: "m2pImg"}, 
                    React.createElement("img", {src: "/assets/images/headImg.jpg", width: "120", height: "120"})
                ), 
                React.createElement("div", {className: "m2pTxt"}, 
                    React.createElement("a", {href: "#", className: "m2Btn"}), 
                    "支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传")), 
            React.createElement("div", {className: "m2fm"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 登录名："), 
                        React.createElement("input", {ref: "userName", value: member.userName, onChange: this.onChange.bind(this, 'userName'), className: "m2fm_int", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 密  码："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 姓  名："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 性  别："), 
                        React.createElement("input", {placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "男"), 
                                React.createElement("dd", null, "女"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 身份证号："), 
                        React.createElement("input", {ref: "idCardNumber", value: member.idCardNumber, onChange: this.onChange.bind(this, 'idCardNumber'), className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 出生年月："), 
                        React.createElement("input", {placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 民  族："), 
                        React.createElement("input", {placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "汉"), 
                                React.createElement("dd", null, "维吾尔"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 职  务："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 学  历："), 
                        React.createElement("input", {placeholder: "大专", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "大专"), 
                                React.createElement("dd", null, "本科"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 学  位："), 
                        React.createElement("input", {placeholder: "博士", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "博士"), 
                                React.createElement("dd", null, "博士"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 联系电话："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 手机号码："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 邮  箱："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 申请入党日期："), 
                        React.createElement("input", {placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: "", type: "text"}))), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fm m2fm2"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 籍  贯："), 
                        React.createElement("input", {placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "汉"), 
                                React.createElement("dd", null, "维吾尔"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 工作岗位：："), 
                        React.createElement("input", {placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "汉"), 
                                React.createElement("dd", null, "维吾尔"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, "参加工作日期："), 
                        React.createElement("input", {placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, "专业技术职务："), 
                        React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, "工作岗位开始日期："), 
                        React.createElement("input", {placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: "", type: "text"}))), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fmSubmitBox"}, 
                React.createElement("input", {onClick: this.onSubmit.bind(this), className: "m2fmSubmit", name: "", type: "reset", value: ""})
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Form;
//# sourceMappingURL=form.js.map
"use strict";
const React = require('react');
const _ = require('lodash');
const Upload = require('rc-upload');
const RCCalendar = require('rc-calendar');
const LOCALE = require('rc-calendar/lib/locale/zh_CN');
const react_router_1 = require('react-router');
const models = require('../../../api/models');
const utils = require('../../../lib/utils');
const client_1 = require('../../../lib/client');
const links = require('../../../constants/links');
class Form extends React.Component {
    constructor(props) {
        super(props);
        const member = this.props.member ? this.props.member : _.assign(new models.Member(), this.props.user);
        const isEdit = this.props.member ? true : false;
        this.state = {
            user: this.props.user,
            member: member,
            isEdit: isEdit,
            isSex: false,
            isApplyCalendar: false
        };
    }
    componentWillReceiveProps(nextProps) {
        const member = nextProps.member ? nextProps.member : _.assign(new models.Member(), nextProps.user);
        const isEdit = nextProps.member ? true : false;
        this.setState({
            user: nextProps.user,
            member: member,
            isEdit: isEdit,
            isSex: false,
            isApplyCalendar: false
        });
    }
    onChange(name, e) {
        const user = this.state.user;
        const member = this.state.member;
        if (user) {
            user[name] = e.target.value;
        }
        member[name] = e.target.value;
        this.setState({
            user: user,
            member: member,
            isEdit: this.state.isEdit,
            isSex: false,
            isApplyCalendar: false,
        });
    }
    onValueChange(name, value, e) {
        const user = this.state.user;
        const member = this.state.member;
        if (user) {
            user[name] = value;
        }
        member[name] = value;
        this.setState({
            user: user,
            member: member,
            isEdit: this.state.isEdit,
            isSex: false,
            isApplyCalendar: false,
        });
    }
    onCalendarSelect(name, value, e) {
        const user = this.state.user;
        const member = this.state.member;
        if (user) {
            user[name] = utils.Translate.toMomentByDate(new Date(value.time)).format("YYYY-MM-DD");
        }
        member[name] = utils.Translate.toMomentByDate(new Date(value.time)).format("YYYY-MM-DD");
        this.setState({
            user: user,
            member: member,
            isEdit: this.state.isEdit,
            isSex: false,
            isApplyCalendar: false,
        });
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const user = this.state.user;
        const member = this.state.member;
        if (member.userName) {
            utils.DOM.loading(true);
            client_1.default.users.edit(user, (err, res) => {
                if (!err) {
                    if (this.state.isEdit) {
                        client_1.default.members.edit(member, (err, res) => {
                            utils.DOM.loading(false);
                            if (!err) {
                                react_router_1.browserHistory.push(links.MEMBERS);
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
                                react_router_1.browserHistory.push(links.MEMBERS);
                            }
                            else {
                                utils.Swal.error(err);
                            }
                        });
                    }
                }
                else {
                    utils.DOM.loading(false);
                    utils.Swal.error(err);
                }
            });
        }
    }
    onSexClick(e) {
        this.setState({
            user: this.state.user,
            member: this.state.member,
            isEdit: this.state.isEdit,
            isSex: !this.state.isSex,
            isApplyCalendar: this.state.isApplyCalendar,
        });
    }
    onApplyCalendarClick(e) {
        this.setState({
            user: this.state.user,
            member: this.state.member,
            isEdit: this.state.isEdit,
            isSex: this.state.isSex,
            isApplyCalendar: !this.state.isApplyCalendar,
        });
    }
    render() {
        const user = this.state.user;
        const member = this.state.member;
        let applyCalendarEl = null;
        if (this.state.isApplyCalendar) {
            applyCalendarEl = React.createElement(RCCalendar, {locale: LOCALE, onSelect: this.onCalendarSelect.bind(this, 'applyPartyDate')});
        }
        const props = utils.UploadProps.getAvatarProps(user.userName, (result) => {
            const user = this.state.user;
            user.avatarUrl = result.avatarUrl;
            this.setState({
                user: user,
                member: this.state.member,
                isEdit: this.state.isEdit,
                isSex: false,
                isApplyCalendar: false,
            });
        }, (message) => {
            utils.Swal.error({
                status: 0,
                message: message
            });
        });
        const avatarUrl = user.avatarUrl || "/assets/images/headImg.jpg";
        return (React.createElement("div", {className: "m2con2"}, 
            React.createElement("div", {className: "m2c2_t"}, "基础资料表单"), 
            React.createElement("div", {className: "m2upLaod"}, 
                React.createElement("div", {className: "m2pImg"}, 
                    React.createElement("img", {src: avatarUrl, width: "120", height: "120"})
                ), 
                React.createElement("div", {className: "m2pTxt"}, 
                    React.createElement(Upload, React.__spread({}, props), 
                        React.createElement("a", {href: 'javascript:void(0)', className: "m2Btn"})
                    ), 
                    "支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传")), 
            React.createElement("div", {className: "m2fm"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 登录名："), 
                        React.createElement("input", {value: user.userName, onChange: this.onChange.bind(this, 'userName'), className: "m2fm_int", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 密  码："), 
                        React.createElement("input", {onChange: this.onChange.bind(this, 'password'), className: "m2fm_int", name: "", type: "password"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 姓  名："), 
                        React.createElement("input", {value: user.displayName, onChange: this.onChange.bind(this, 'displayName'), className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 性  别："), 
                        React.createElement("input", {onClick: this.onSexClick.bind(this), value: user.sex, placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox", style: { display: this.state.isSex ? "block" : "none" }}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "sex", "男")}, "男"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "sex", "女")}, "女"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 身份证号："), 
                        React.createElement("input", {ref: "idCardNumber", className: "m2fm_int", name: "", type: "text"})), 
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
                        React.createElement("input", {value: utils.Translate.toShortDate(member.applyPartyDate.toString()), onClick: this.onApplyCalendarClick.bind(this), onChange: this.onChange.bind(this, "applyPartyDate"), className: "m2fm_int m2fm_int2", name: "", type: "text"}), 
                        applyCalendarEl)), 
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
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
            isApplyCalendar: false,
            isNationality: false,
            isEducation: false,
            isDegree: false,
            isNativePlace: false,
            isWorkingHours: false,
            isBirthDay: false
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
            isApplyCalendar: false,
            isNationality: false,
            isEducation: false,
            isDegree: false,
            isNativePlace: false,
            isWorkingHours: false,
            isBirthDay: false
        });
    }
    onChange(name, e) {
        const user = this.state.user;
        const member = this.state.member;
        if (user) {
            user[name] = e.target.value;
        }
        member[name] = e.target.value;
        this.state.user = user;
        this.state.member = member;
        this.reset();
        this.setState(this.state);
    }
    reset() {
        this.state.isSex = false;
        this.state.isEducation = false;
        this.state.isNationality = false;
        this.state.isApplyCalendar = false;
        this.state.isDegree = false;
        this.state.isNativePlace = false;
        this.state.isWorkingHours = false;
        this.state.isBirthDay = false;
    }
    onValueChange(name, value, e) {
        const user = this.state.user;
        const member = this.state.member;
        if (user) {
            user[name] = value;
        }
        member[name] = value;
        this.state.user = user;
        this.state.member = member;
        this.reset();
        this.setState(this.state);
    }
    onCalendarSelect(name, value, e) {
        const user = this.state.user;
        const member = this.state.member;
        const date = utils.Translate.toShortDate(new Date(value.time).toString());
        if (user) {
            user[name] = date;
        }
        member[name] = date;
        this.state.user = user;
        this.state.member = member;
        this.reset();
        this.setState(this.state);
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const user = this.state.user;
        const member = this.state.member;
        if (member.userName) {
            utils.DOM.loading(true);
            client_1.default.users.edit(user.userName, user, (err, res) => {
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
    onClick(name, e) {
        this.state[name] = !this.state[name];
        this.setState(this.state);
    }
    render() {
        const user = this.state.user;
        const member = this.state.member;
        let applyCalendarEl = null;
        if (this.state.isApplyCalendar) {
            applyCalendarEl = React.createElement(RCCalendar, {locale: LOCALE, onSelect: this.onCalendarSelect.bind(this, 'applyPartyDate')});
        }
        let workingHoursCalendarEl = null;
        if (this.state.isWorkingHours) {
            workingHoursCalendarEl = React.createElement(RCCalendar, {locale: LOCALE, onSelect: this.onCalendarSelect.bind(this, 'workingHours')});
        }
        let birthDayCalendarEl = null;
        if (this.state.isBirthDay) {
            birthDayCalendarEl = React.createElement(RCCalendar, {locale: LOCALE, onSelect: this.onCalendarSelect.bind(this, 'birthDay')});
        }
        const props = utils.UploadProps.getAvatarProps(user.userName, (result) => {
            const user = this.state.user;
            user.avatarUrl = result.avatarUrl;
            this.state.user = user;
            this.setState(this.state);
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
                        React.createElement("input", {onClick: this.onClick.bind(this, "isSex"), value: user.sex, placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox", style: { display: this.state.isSex ? "block" : "none" }}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "sex", "男")}, "男"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "sex", "女")}, "女"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 身份证号："), 
                        React.createElement("input", {value: user.idCardNumber, onChange: this.onChange.bind(this, 'idCardNumber'), ref: "idCardNumber", className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 出生年月："), 
                        React.createElement("input", {value: utils.Translate.toShortDate(user.birthDay.toString()), onClick: this.onClick.bind(this, "isBirthDay"), onChange: this.onChange.bind(this, "birthDate"), placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: "", type: "text"}), 
                        birthDayCalendarEl), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 民  族："), 
                        React.createElement("input", {onClick: this.onClick.bind(this, "isNationality"), value: user.nationality, placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox", style: { display: this.state.isNationality ? "block" : "none" }}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "nationality", "汉")}, "汉"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "nationality", "维吾尔")}, "维吾尔"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 职  务："), 
                        React.createElement("input", {value: user.administrativeDuties, onChange: this.onChange.bind(this, 'administrativeDuties'), ref: "administrativeDuties", className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 学  历："), 
                        React.createElement("input", {onClick: this.onClick.bind(this, "isEducation"), value: user.education, placeholder: "本科", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox", style: { display: this.state.isEducation ? "block" : "none" }}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "education", "大专")}, "大专"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "education", "本科")}, "本科"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 学  士："), 
                        React.createElement("input", {onClick: this.onClick.bind(this, "isDegree"), value: user.degree, placeholder: "博士", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox", style: { display: this.state.isDegree ? "block" : "none" }}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "degree", "博士")}, "博士"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "degree", "硕士")}, "硕士"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "degree", "学士")}, "学士"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 联系电话："), 
                        React.createElement("input", {value: user.tel, onChange: this.onChange.bind(this, 'tel'), ref: "tel", className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 手机号码："), 
                        React.createElement("input", {value: user.mobile, onChange: this.onChange.bind(this, 'mobile'), ref: "mobile", className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 邮  箱："), 
                        React.createElement("input", {value: user.email, onChange: this.onChange.bind(this, 'email'), ref: "email", className: "m2fm_int", name: "", type: "text"})), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 申请入党日期："), 
                        React.createElement("input", {value: utils.Translate.toShortDate(member.applyPartyDate.toString()), onClick: this.onClick.bind(this, "isApplyCalendar"), onChange: this.onChange.bind(this, "applyPartyDate"), className: "m2fm_int m2fm_int2", name: "", type: "text"}), 
                        applyCalendarEl)), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fm m2fm2"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, " 籍  贯："), 
                        React.createElement("input", {onClick: this.onClick.bind(this, "isNativePlace"), value: user.nativePlace, placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox", style: { display: this.state.isNativePlace ? "block" : "none" }}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "nativePlace", "北京")}, "北京"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "nativePlace", "上海")}, "上海"), 
                                React.createElement("dd", {onClick: this.onValueChange.bind(this, "nativePlace", "广东")}, "广东"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, 
                            React.createElement("strong", {className: "cor_red"}, "*"), 
                            " 工作岗位："), 
                        React.createElement("input", {placeholder: "请选择", className: "m2fm_int m2fm_int3", type: "text"}), 
                        React.createElement("div", {className: "m2fm_selBox"}, 
                            React.createElement("dl", null, 
                                React.createElement("dd", null, "汉"), 
                                React.createElement("dd", null, "维吾尔"))
                        )), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, "参加工作日期："), 
                        React.createElement("input", {value: utils.Translate.toShortDate(user.workingHours.toString()), onClick: this.onClick.bind(this, "isWorkingHours"), onChange: this.onChange.bind(this, "workingHours"), placeholder: "2016-01-20", className: "m2fm_int m2fm_int2", name: "", type: "text"}), 
                        workingHoursCalendarEl), 
                    React.createElement("li", null, 
                        React.createElement("span", {className: "m2fm_s1"}, "专业技术职务："), 
                        React.createElement("input", {value: user.technicalPositions, onChange: this.onChange.bind(this, 'technicalPositions'), ref: "technicalPositions", className: "m2fm_int", name: "", type: "text"}))), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fmSubmitBox"}, 
                React.createElement("input", {onClick: this.onSubmit.bind(this), className: "m2fmSubmit", name: "", type: "reset", value: ""})
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Form;
//# sourceMappingURL=form.js.map
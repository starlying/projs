"use strict";
const React = require('react');
class PartyMemberNotFoundPage extends React.Component {
    render() {
        return (React.createElement("div", {className: "main2"}, 
            React.createElement("div", {className: "m2pos"}, 
                React.createElement("a", {className: "m2pos_a", href: "#"}, "首页"), 
                " > ", 
                React.createElement("a", {className: "m2pos_a", href: "#"}, "二级栏目位置"), 
                " > ", 
                React.createElement("span", {className: "m2pos_cut"}, "当前栏目位置")), 
            React.createElement("div", {className: "m2con1"}, 
                React.createElement("div", {className: "m2c1_top"}, 
                    React.createElement("strong", null, "身份证："), 
                    React.createElement("input", {className: "m2c1_int", placeholder: "请输入身份证号码", name: "", type: "text"}), 
                    React.createElement("input", {value: "", className: "m2submit", name: "", type: "submit"})), 
                React.createElement("div", {className: "m2c1_cer"}, 
                    React.createElement("input", {name: "", type: "radio", value: ""}), 
                    "张三（群众）", 
                    React.createElement("input", {name: "", type: "radio", value: ""}), 
                    "李斯（党员）", 
                    React.createElement("input", {name: "", type: "radio", value: ""}), 
                    "王五（群众）")), 
            React.createElement("div", {className: "m2con2"}, 
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
                            React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
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
                            React.createElement("input", {className: "m2fm_int", name: "", type: "text"})), 
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
                    React.createElement("input", {className: "m2fmSubmit", name: "", type: "reset", value: ""})
                ))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PartyMemberNotFoundPage;
//# sourceMappingURL=partyMemberNotFound.js.map
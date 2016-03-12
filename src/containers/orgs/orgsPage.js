"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const components_1 = require('../../lib/components');
const client_1 = require('../../lib/client');
const models = require('../../api/models');
const location_1 = require("../../components/location");
const subNav_1 = require("../../components/orgs/subNav");
const actions = require('../../actions/authActions');
const form_1 = require("../../components/orgs/add/form");
class OrgPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: null,
            id: null
        };
    }
    componentDidMount() {
        client_1.default.members.list('14', (err, res) => {
            let members = [];
            if (!err && res.members) {
                members = res.members;
            }
            this.setState({
                members: members,
                id: null
            });
        });
    }
    onAdd(e) {
        this.setState({
            members: this.state.members,
            id: "-"
        });
    }
    onEdit(id, e) {
        this.setState({
            members: this.state.members,
            id: id
        });
    }
    onClose(e) {
        this.setState({
            members: this.state.members,
            id: null
        });
    }
    render() {
        if (!this.state.members || this.state.members.length == 0)
            return React.createElement(components_1.InnerLoading, null);
        const listEl = this.state.members.map((member) => {
            return (React.createElement("tr", {key: member.id}, 
                React.createElement("td", null, 
                    React.createElement("input", {className: "lay-rad", name: "", type: "checkbox", value: ""})
                ), 
                React.createElement("td", null, 
                    React.createElement("span", {className: "cor_red"}, "丁皓")
                ), 
                React.createElement("td", null, "男"), 
                React.createElement("td", null, "政企分公司"), 
                React.createElement("td", null, "2011年2月"), 
                React.createElement("td", null, "4"), 
                React.createElement("td", null, "1300989900"), 
                React.createElement("td", null, 
                    React.createElement(react_router_1.Link, {className: "m2fm_abtn", to: "/member/edit/" + member.id}, "编辑"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "转出"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "列为积极分子"))));
        });
        let pager = null;
        let formEl = null;
        if (this.state.id) {
            formEl = React.createElement(form_1.default, {member: new models.Member(), onClose: this.onClose.bind(this)});
        }
        return (React.createElement("div", {className: "main2"}, 
            formEl, 
            React.createElement(location_1.default, null), 
            React.createElement(subNav_1.default, React.__spread({}, this.props)), 
            React.createElement("div", {className: "m2fm_stop"}, 
                React.createElement("span", {className: "m2fm_ss1"}, "组织名称："), 
                React.createElement("input", {type: "text", name: "", className: "m2fm_int m2fm_int8"}), 
                React.createElement("span", {className: "m2fm_ss1"}, "是否有效："), 
                React.createElement("div", {className: "m2fm_selContent"}, 
                    React.createElement("input", {type: "text", className: "m2fm_int m2fm_int3 m2fm_int9", placeholder: "全部"}), 
                    React.createElement("div", {className: "m2fm_selBox m2fm_selBox2"}, 
                        React.createElement("dl", null, 
                            React.createElement("dd", null, "党员"), 
                            React.createElement("dd", null, "非党员"))
                    )), 
                React.createElement("span", {className: "m2fm_ss1"}, "组织类型："), 
                React.createElement("div", {className: "m2fm_selContent"}, 
                    React.createElement("input", {type: "text", className: "m2fm_int m2fm_int3", placeholder: "全部"}), 
                    React.createElement("div", {className: "m2fm_selBox"}, 
                        React.createElement("dl", null, 
                            React.createElement("dd", null, "党员"), 
                            React.createElement("dd", null, "非党员"))
                    )), 
                React.createElement("input", {type: "submit", name: "", className: "m2submit", value: ""}), 
                React.createElement("a", {href: "javascript:;", onClick: this.onAdd.bind(this), className: "m2addBtn"}, 
                    React.createElement("img", {src: "/assets/images/m2btn.jpg", width: "76", height: "32"})
                )), 
            React.createElement("div", {className: "m2fm_tabBox m2fm_tabBox2 m2pdTab"}, 
                React.createElement("table", {width: "100%"}, 
                    React.createElement("tbody", null, 
                        React.createElement("tr", {className: "m2th"}, 
                            React.createElement("td", {width: "33%"}, "组织名称"), 
                            React.createElement("td", {width: "25%"}, "组织类型 "), 
                            React.createElement("td", {width: "24%"}, "是否有效"), 
                            React.createElement("td", {width: "18%"}, "操作")), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, 
                                React.createElement("span", {className: "cor_red"}, "政企分公司党委活动")
                            ), 
                            React.createElement("td", null, "党委"), 
                            React.createElement("td", null, "是"), 
                            React.createElement("td", null, 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "授权"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "删除"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "javascript:;", onClick: this.onEdit.bind(this, "1")}, "编辑"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, 
                                React.createElement("span", {className: "cor_red"}, "政企分公司党委活动")
                            ), 
                            React.createElement("td", null, "党委"), 
                            React.createElement("td", null, "是"), 
                            React.createElement("td", null, 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "授权"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "删除"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "javascript:;", onClick: this.onEdit.bind(this, "1")}, "编辑"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, 
                                React.createElement("span", {className: "cor_red"}, "政企分公司党委活动")
                            ), 
                            React.createElement("td", null, "党委"), 
                            React.createElement("td", null, "是"), 
                            React.createElement("td", null, 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "授权"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "删除"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "javascript:;", onClick: this.onEdit.bind(this, "1")}, "编辑"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, 
                                React.createElement("span", {className: "cor_red"}, "政企分公司党委活动")
                            ), 
                            React.createElement("td", null, "党委"), 
                            React.createElement("td", null, "是"), 
                            React.createElement("td", null, 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "授权"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "删除"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "javascript:;", onClick: this.onEdit.bind(this, "1")}, "编辑"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, 
                                React.createElement("span", {className: "cor_red"}, "政企分公司党委活动")
                            ), 
                            React.createElement("td", null, "党委"), 
                            React.createElement("td", null, "是"), 
                            React.createElement("td", null, 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "授权"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "#"}, "删除"), 
                                React.createElement("a", {className: "m2fm_abtn", href: "javascript:;", onClick: this.onEdit.bind(this, "1")}, "编辑"))))
                ), 
                React.createElement("div", {className: "m2fm_page"}, 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "＜"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a on"}, "1"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "2"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "3"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "4"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "5"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "6"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "7"), 
                    React.createElement("span", {className: "m2fmPage_a2"}, "..."), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "99"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "100"), 
                    React.createElement("a", {href: "#", className: "m2fmPage_a"}, "＞")))));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: redux_1.bindActionCreators(actions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OrgPage);
//# sourceMappingURL=orgsPage.js.map
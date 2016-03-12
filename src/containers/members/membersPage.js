"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const components_1 = require('../../lib/components');
const client_1 = require('../../lib/client');
const location_1 = require("../../components/location");
const subNav_1 = require("../../components/members/subNav");
const actions = require('../../actions/authActions');
const links = require('../../constants/links');
class MemberPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: null
        };
    }
    componentDidMount() {
        client_1.default.members.list(this.props.authState.member.orgID, (err, res) => {
            let members = [];
            if (!err && res.members) {
                members = res.members;
            }
            this.setState({
                members: members
            });
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
                    React.createElement(react_router_1.Link, {className: "m2fm_abtn", to: "/members/edit/" + member.id}, "编辑"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "转出"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "列为积极分子"))));
        });
        let pager = null;
        return (React.createElement("div", {className: "main2"}, 
            React.createElement(location_1.default, null), 
            React.createElement(subNav_1.default, null), 
            React.createElement("div", {className: "m2fm_stop"}, 
                React.createElement("span", {className: "m2fm_ss1"}, "姓名："), 
                React.createElement("input", {type: "text", name: "", className: "m2fm_int m2fm_int6"}), 
                React.createElement("span", {className: "m2fm_ss1"}, "变动时间："), 
                React.createElement("input", {type: "text", name: "", className: "m2fm_int m2fm_int2", placeholder: "2016-01-20"}), 
                React.createElement("span", {className: "m2fm_ss1 m2fm_ss2"}, "至"), 
                React.createElement("input", {type: "text", name: "", className: "m2fm_int m2fm_int2", placeholder: "2016-01-20"}), 
                React.createElement("input", {type: "submit", name: "", className: "m2submit", value: ""}), 
                React.createElement(react_router_1.Link, {to: links.MEMBERS_ADD, className: "m2addBtn"}, 
                    React.createElement("img", {src: "/assets/images/m2btn.jpg", width: "76", height: "32"})
                )), 
            React.createElement("div", {className: "m2fm_tabBox m2fm_tabBox2"}, 
                React.createElement("table", {width: "100%"}, 
                    React.createElement("tbody", null, 
                        React.createElement("tr", {className: "m2th"}, 
                            React.createElement("td", {width: "4%"}, 
                                React.createElement("input", {className: "lay-rad", name: "", type: "checkbox", value: ""})
                            ), 
                            React.createElement("td", {width: "9%"}, "姓名"), 
                            React.createElement("td", {width: "9%"}, "性别"), 
                            React.createElement("td", {width: "16%"}, "所属组织"), 
                            React.createElement("td", {width: "13%"}, "申请入党日期"), 
                            React.createElement("td", {width: "13%"}, "思想汇报份数"), 
                            React.createElement("td", {width: "13%"}, "手机"), 
                            React.createElement("td", {width: "23%"}, "操作")), 
                        listEl)
                )
            )));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MemberPage);
//# sourceMappingURL=membersPage.js.map
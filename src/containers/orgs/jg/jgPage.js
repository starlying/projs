"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const components_1 = require('../../../lib/components');
const client_1 = require('../../../lib/client');
const location_1 = require("../../../components/location");
const actions = require('../../../actions/authActions');
class JGPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: null
        };
    }
    componentDidMount() {
        client_1.default.members.list('14', (err, res) => {
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
                    React.createElement(react_router_1.Link, {className: "m2fm_abtn", to: "/member/edit/" + member.id}, "编辑"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "转出"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "列为积极分子"))));
        });
        let pager = null;
        return (React.createElement("div", {className: "main2"}, 
            React.createElement(location_1.default, null), 
            React.createElement("div", {className: "m2sfBox"}, 
                React.createElement("strong", null, "身份证："), 
                React.createElement("input", {type: "text", name: "", placeholder: "请输入身份证号码", className: "m2c1_int"}), 
                React.createElement("input", {type: "submit", name: "", className: "m2submit", value: ""})), 
            React.createElement("div", {className: "m2fm_t1"}, "中共中国移动通信集团河北有限公司直属机关委员会"), 
            React.createElement("div", {className: "m2fm_alink"}, 
                React.createElement("a", {href: "/orgs/1", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fm_t1"}, "中移全通系统集成有限公司党总支"), 
            React.createElement("div", {className: "m2fm_alink"}, 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fm_t1"}, "中移全通系统集成有限公司党总支"), 
            React.createElement("div", {className: "m2fm_alink"}, 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("div", {className: "clear"})), 
            React.createElement("div", {className: "m2fm_t1"}, "中移全通系统集成有限公司党总支"), 
            React.createElement("div", {className: "m2fm_alink"}, 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "工程部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "财务部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "人力资源部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "综合部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "发展计划部党支部"), 
                React.createElement("a", {href: "#", className: "m2fm_a"}, "市场经营部党支部"), 
                React.createElement("div", {className: "clear"}))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(JGPage);
//# sourceMappingURL=jgPage.js.map
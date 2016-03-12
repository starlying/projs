"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const components_1 = require('../../../lib/components');
const client_1 = require('../../../lib/client');
const location_1 = require("../../../components/location");
const subNav_1 = require("../../../components/orgs/subNav");
const actions = require('../../../actions/authActions');
class HJPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: null,
            id: null
        };
    }
    componentDidMount() {
        client_1.default.orgs.list(this.props.authState.member.orgID, (err, res) => {
            let orgs = [];
            if (!err && res.orgs) {
                orgs = res.orgs;
            }
            this.setState({
                orgs: orgs,
                id: null
            });
        });
    }
    onAdd(e) {
        this.setState({
            orgs: this.state.orgs,
            id: 0
        });
    }
    onEdit(id, e) {
        this.setState({
            orgs: this.state.orgs,
            id: id
        });
    }
    onClose(e) {
        this.setState({
            orgs: this.state.orgs,
            id: null
        });
    }
    render() {
        if (!this.state.orgs || this.state.orgs.length == 0)
            return React.createElement(components_1.InnerLoading, null);
        const listEl = this.state.orgs.map((org) => {
            return (React.createElement("tr", {key: org.id}, 
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
                    React.createElement(react_router_1.Link, {className: "m2fm_abtn", to: "/org/edit/" + org.id}, "编辑"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "转出"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "列为积极分子"))));
        });
        let pager = null;
        let formEl = null;
        if (this.state.id) {
        }
        return (React.createElement("div", {className: "main2"}, 
            formEl, 
            React.createElement(location_1.default, null), 
            React.createElement(subNav_1.default, React.__spread({}, this.props)), 
            React.createElement("div", {className: "m2fm_stop"}, 
                React.createElement("span", {className: "m2fm_ss1"}, "换届届数："), 
                React.createElement("input", {type: "text", name: "", className: "m2fm_int m2fm_int4", placeholder: ""}), 
                React.createElement("input", {type: "submit", name: "", className: "m2submit", value: ""}), 
                React.createElement("a", {href: "#", className: "m2fm_btn1"}, "新增换届记录")), 
            React.createElement("div", {className: "m2fm_tabBox"}, 
                React.createElement("table", {width: "100%"}, 
                    React.createElement("tbody", null, 
                        React.createElement("tr", {className: "m2th"}, 
                            React.createElement("td", {width: "6%"}, "界数"), 
                            React.createElement("td", {width: "10%"}, "任期年限"), 
                            React.createElement("td", {width: "10%"}, "换届时间"), 
                            React.createElement("td", {width: "13%"}, "应到会人数"), 
                            React.createElement("td", {width: "13%"}, "实到会人数"), 
                            React.createElement("td", {width: "34%"}, "选举情况"), 
                            React.createElement("td", {width: "14%"}, "编辑")), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "2011年2月"), 
                            React.createElement("td", null, "3"), 
                            React.createElement("td", null, "4"), 
                            React.createElement("td", null, 
                                React.createElement("p", {className: "m2fm_pa"}, "多行文本请留意位置多行文本请留意多行文本请留意多行文本")
                            ), 
                            React.createElement("td", null, 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "编辑"), 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "查看"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "2011年2月"), 
                            React.createElement("td", null, "3"), 
                            React.createElement("td", null, "4"), 
                            React.createElement("td", null, 
                                React.createElement("p", {className: "m2fm_pa"}, "多行文本请留意位置多行文本请留意多行文本请留意多行文本")
                            ), 
                            React.createElement("td", null, 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "编辑"), 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "查看"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "2011年2月"), 
                            React.createElement("td", null, "3"), 
                            React.createElement("td", null, "4"), 
                            React.createElement("td", null, 
                                React.createElement("p", {className: "m2fm_pa"}, "多行文本请留意位置多行文本请留意多行文本请留意多行文本")
                            ), 
                            React.createElement("td", null, 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "编辑"), 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "查看"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "2011年2月"), 
                            React.createElement("td", null, "3"), 
                            React.createElement("td", null, "4"), 
                            React.createElement("td", null, 
                                React.createElement("p", {className: "m2fm_pa"}, "多行文本请留意位置多行文本请留意多行文本请留意多行文本")
                            ), 
                            React.createElement("td", null, 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "编辑"), 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "查看"))), 
                        React.createElement("tr", null, 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "1"), 
                            React.createElement("td", null, "2011年2月"), 
                            React.createElement("td", null, "3"), 
                            React.createElement("td", null, "4"), 
                            React.createElement("td", null, 
                                React.createElement("p", {className: "m2fm_pa"}, "多行文本请留意位置多行文本请留意多行文")
                            ), 
                            React.createElement("td", null, 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "编辑"), 
                                React.createElement("a", {href: "#", className: "m2fm_abtn"}, "查看"))))
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HJPage);
//# sourceMappingURL=hjPage.js.map
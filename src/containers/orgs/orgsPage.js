"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const components_1 = require('../../lib/components');
const client_1 = require('../../lib/client');
const location_1 = require("../../components/location");
const subNav_1 = require("../../components/orgs/subNav");
const actions = require('../../actions/authActions');
const form_1 = require("../../components/orgs/add/form");
class OrgPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: null,
            isWin: false,
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
                isWin: false,
                id: null
            });
        });
    }
    onAdd(e) {
        this.setState({
            orgs: this.state.orgs,
            isWin: true,
            id: 0
        });
    }
    onEdit(id, e) {
        this.setState({
            orgs: this.state.orgs,
            isWin: true,
            id: id
        });
    }
    onClose(e) {
        this.setState({
            orgs: this.state.orgs,
            isWin: false,
            id: null
        });
    }
    render() {
        if (!this.state.orgs)
            return React.createElement(components_1.InnerLoading, null);
        const listEl = this.state.orgs.map((org) => {
            return (React.createElement("tr", null, 
                React.createElement("td", null, 
                    React.createElement("span", {className: "cor_red"}, org.orgName)
                ), 
                React.createElement("td", null, org.orgType), 
                React.createElement("td", null, org.isCancel ? "否" : "是"), 
                React.createElement("td", null, 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "授权"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "#"}, "删除"), 
                    React.createElement("a", {className: "m2fm_abtn", href: "javascript:;", onClick: this.onEdit.bind(this, org.id)}, "编辑"))));
        });
        let pager = null;
        let formEl = null;
        if (this.state.isWin) {
            let org = null;
            this.state.orgs.forEach((o) => {
                if (this.state.id === o.id) {
                    org = o;
                }
            });
            formEl = React.createElement(form_1.default, {org: org, parentID: this.props.authState.member.orgID, onClose: this.onClose.bind(this)});
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
                        listEl)
                ), 
                pager)));
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
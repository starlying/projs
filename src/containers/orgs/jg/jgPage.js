"use strict";
const React = require('react');
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
            orgs: null,
            orgMap: {}
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
                orgMap: {}
            });
            orgs.forEach((child) => {
                if (child.childrenCount > 0) {
                    client_1.default.orgs.list(this.props.authState.member.orgID, (err, res) => {
                        this.state.orgMap[child.id] = orgs;
                        this.setState({
                            orgs: this.state.orgs,
                            orgMap: this.state.orgMap
                        });
                    });
                }
            });
        });
    }
    render() {
        if (!this.state.orgs || this.state.orgs.length == 0)
            return React.createElement(components_1.InnerLoading, null);
        let isLevel = false;
        this.state.orgs.forEach((org) => {
            if (org.childrenCount > 0) {
                isLevel = true;
            }
        });
        let listEl = null;
        if (isLevel) {
            listEl = this.state.orgs.map((org) => {
                const childOrgs = this.state.orgMap[org.id];
                const childEl = childOrgs.map((child) => {
                    return React.createElement("a", {key: child.id, href: "#", className: "m2fm_a"}, child.orgName);
                });
                return (React.createElement("div", {key: org.id}, 
                    React.createElement("div", {className: "m2fm_t1"}, org.orgName), 
                    React.createElement("div", {className: "m2fm_alink"}, 
                        childEl, 
                        React.createElement("div", {className: "clear"}))));
            });
        }
        else {
            const childEl = this.state.orgs.map((org) => {
                return React.createElement("a", {key: org.id, href: "#", className: "m2fm_a"}, org.orgName);
            });
            listEl = (React.createElement("div", null, 
                React.createElement("div", {className: "m2fm_t1"}, this.props.authState.org.orgName), 
                React.createElement("div", {className: "m2fm_alink"}, 
                    childEl, 
                    React.createElement("div", {className: "clear"}))));
        }
        return (React.createElement("div", {className: "main2"}, 
            React.createElement(location_1.default, null), 
            listEl, 
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
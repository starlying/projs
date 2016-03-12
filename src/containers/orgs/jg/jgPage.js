"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const components_1 = require('../../../lib/components');
const client_1 = require('../../../lib/client');
const links = require('../../../constants/links');
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
                    return React.createElement(react_router_1.Link, {key: child.id, to: links.INDEX + "?orgID=" + child.id, className: "m2fm_a"}, child.orgName);
                });
                return (React.createElement("div", {key: org.id}, 
                    React.createElement("div", {className: "m2fm_t1"}, 
                        React.createElement(react_router_1.Link, {key: org.id, to: links.INDEX + "?orgID=" + org.id}, org.orgName)
                    ), 
                    React.createElement("div", {className: "m2fm_alink"}, 
                        childEl, 
                        React.createElement("div", {className: "clear"}))));
            });
        }
        else {
            const childEl = this.state.orgs.map((org) => {
                return React.createElement(react_router_1.Link, {key: org.id, to: links.INDEX + "?orgID=" + org.id, className: "m2fm_a"}, org.orgName);
            });
            listEl = (React.createElement("div", null, 
                React.createElement("div", {className: "m2fm_t1"}, 
                    React.createElement(react_router_1.Link, {key: this.props.authState.org.id, to: links.INDEX + "?orgID=" + this.props.authState.org.id}, this.props.authState.org.orgName)
                ), 
                React.createElement("div", {className: "m2fm_alink"}, 
                    childEl, 
                    React.createElement("div", {className: "clear"}))));
        }
        return (React.createElement("div", {className: "main2"}, 
            React.createElement(location_1.default, null), 
            listEl));
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
"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_router_1 = require('react-router');
const react_redux_1 = require('react-redux');
const components_1 = require('../lib/components');
const top_1 = require("../containers/top");
const header_1 = require("../containers/header");
const nav_1 = require("../components/nav");
const footer_1 = require("../components/footer");
const actions = require('../actions/authActions');
class App extends React.Component {
    componentWillMount() {
        if (this.props.authState.isAnonymous) {
            react_router_1.browserHistory.push('/login');
        }
    }
    render() {
        return (React.createElement("div", null, 
            React.createElement(top_1.default, null), 
            React.createElement(header_1.default, null), 
            React.createElement(nav_1.default, null), 
            this.props.children, 
            React.createElement(footer_1.default, null), 
            React.createElement(components_1.Loading, null)));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map
"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const utils = require('./lib/utils');
const configureStore_1 = require('./store/configureStore');
const app_1 = require('./containers/app');
const indexPage_1 = require('./components/index/indexPage');
const membersPage_1 = require('./components/member/membersPage');
const addPage_1 = require('./components/member/add/addPage');
const notFoundPage_1 = require('./components/notFoundPage');
const loginPage_1 = require('./containers/login/loginPage');
utils.Page.xDomain();
const store = configureStore_1.default();
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, 
    React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, 
        React.createElement(react_router_1.Route, {path: "/login", component: loginPage_1.default}), 
        React.createElement(react_router_1.Route, {path: "/", component: app_1.default}, 
            React.createElement(react_router_1.IndexRoute, {component: indexPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "/member", component: membersPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "/member/add", component: addPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "*", component: notFoundPage_1.default})))
), document.getElementById('root'));
//# sourceMappingURL=index.js.map
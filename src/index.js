"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const utils = require('./lib/utils');
const configureStore_1 = require('./store/configureStore');
const app_1 = require('./containers/app');
const indexPage_1 = require('./components/index/indexPage');
const orgsPage_1 = require('./containers/orgs/orgsPage');
const jgPage_1 = require('./containers/orgs/jg/jgPage');
const hjPage_1 = require('./containers/orgs/hj/hjPage');
const membersPage_1 = require('./containers/members/membersPage');
const addPage_1 = require('./components/members/add/addPage');
const editPage_1 = require('./components/members/edit/editPage');
const jjPage_1 = require('./containers/members/jj/jjPage');
const fzPage_1 = require('./containers/members/fz/fzPage');
const ybPage_1 = require('./containers/members/yb/ybPage');
const userPage_1 = require('./containers/users/userPage');
const notFoundPage_1 = require('./components/notFoundPage');
const loginPage_1 = require('./containers/login/loginPage');
const links = require('./constants/links');
utils.Page.xDomain();
const store = configureStore_1.default();
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, 
    React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, 
        React.createElement(react_router_1.Route, {path: links.LOGIN, component: loginPage_1.default}), 
        React.createElement(react_router_1.Route, {path: links.INDEX, component: app_1.default}, 
            React.createElement(react_router_1.IndexRoute, {component: indexPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.USERS_, component: userPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.ORGS, component: orgsPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.ORGS_JG, component: jgPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.ORGS_HJ, component: hjPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.MEMBERS, component: membersPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.MEMBERS_ADD, component: addPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.MEMBERS_EDIT_, component: editPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.MEMBERS_JJ, component: jjPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.MEMBERS_FZ, component: fzPage_1.default}), 
            React.createElement(react_router_1.Route, {path: links.MEMBERS_YB, component: ybPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "*", component: notFoundPage_1.default})))
), document.getElementById('root'));
//# sourceMappingURL=index.js.map
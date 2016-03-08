"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const utils = require('../lib/utils');
const createStore_1 = require('../lib/redux/createStore');
const reducer_1 = require('./actions/reducer');
const app_1 = require('./containers/app');
const indexPage_1 = require('./index/indexPage');
const partyMemberPage_1 = require('./party-member/partyMemberPage');
const partyMemberAddPage_1 = require('./party-member/add/partyMemberAddPage');
const notFoundPage_1 = require('./components/notFoundPage');
const loginPage_1 = require('./login/loginPage');
utils.Page.xDomain();
const store = createStore_1.default(reducer_1.default, {});
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, 
    React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, 
        React.createElement(react_router_1.Route, {path: "/login", component: loginPage_1.default}), 
        React.createElement(react_router_1.Route, {path: "/", component: app_1.default}, 
            React.createElement(react_router_1.IndexRoute, {component: indexPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "/party-member", component: partyMemberPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "/party-member/add", component: partyMemberAddPage_1.default}), 
            React.createElement(react_router_1.Route, {path: "*", component: notFoundPage_1.default})))
), document.getElementById('root'));
//# sourceMappingURL=index.js.map
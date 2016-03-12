"use strict";
const types = require('../constants/actionTypes');
const utils = require("../lib/utils");
function login(token, user, member, org) {
    utils.Auth.cache(token, user, member, org);
    return { type: types.AUTH_LOGIN, token: token, user: user, member: member, org: org };
}
exports.login = login;
function logout() {
    utils.Auth.removeCache();
    return { type: types.AUTH_LOGOUT };
}
exports.logout = logout;
//# sourceMappingURL=authActions.js.map
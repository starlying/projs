"use strict";
const types = require('../constants/actionTypes');
function login(user) {
    return { type: types.AUTH_LOGIN, user: user };
}
exports.login = login;
//# sourceMappingURL=authActions.js.map
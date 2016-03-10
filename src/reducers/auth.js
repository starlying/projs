"use strict";
const _ = require('lodash');
const types = require('../constants/actionTypes');
const utils = require('../lib/utils');
const token = utils.Auth.getToken();
const user = utils.Auth.getUser();
const isAnonymous = (token && user && user.id) ? false : true;
const initialState = {
    token: token,
    user: user,
    isAnonymous: isAnonymous
};
function authAppState(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return _.assign({}, state, {
                token: action.token,
                user: action.user,
                isAnonymous: (action.token && action.user && action.user.id) ? false : true
            });
        case types.AUTH_LOGOUT:
            return _.assign({}, state, {
                token: "",
                user: null,
                isAnonymous: true
            });
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authAppState;
//# sourceMappingURL=auth.js.map
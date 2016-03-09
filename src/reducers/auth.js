"use strict";
const _ = require('lodash');
const types = require('../constants/actionTypes');
const utils = require('../lib/utils');
const initialState = {
    isAnonymous: utils.Auth.isAnonymous(),
    user: utils.Auth.getUser()
};
function authAppState(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return _.assign({}, state, {
                isAnonymous: action.user ? false : true,
                user: action.user,
            });
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authAppState;
//# sourceMappingURL=auth.js.map
"use strict";
const redux_1 = require('redux');
const auth_1 = require('./auth');
const rootReducer = redux_1.combineReducers({
    authAppState: auth_1.default
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rootReducer;
//# sourceMappingURL=index.js.map
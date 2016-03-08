"use strict";
function thunkMiddleware({ dispatch, getState }) {
    return next => action => typeof action === 'function' ?
        action(dispatch, getState) :
        next(action);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = thunkMiddleware;
//# sourceMappingURL=thunkMiddleware.js.map
"use strict";
const redux_1 = require('redux');
const thunkMiddleware_1 = require("./middleware/thunkMiddleware");
const createStoreWithMiddleware = redux_1.applyMiddleware(thunkMiddleware_1.default)(redux_1.createStore);
function createStore(reducer, initialState) {
    const store = createStoreWithMiddleware(reducer, initialState);
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createStore;
//# sourceMappingURL=createStore.js.map
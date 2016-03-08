"use strict";
const models = require("../../api/models");
const client_1 = require("../../lib/client");
const utils = require("../../lib/utils");
const lang = require("../../lib/lang");
const LOGIN = 'form/LOGIN';
function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return action.value;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducer;
function login(account, password) {
    return dispatch => {
        utils.DOM.loading(true);
        var api = client_1.default.users;
        api.login(account, password, (err, res) => {
            utils.DOM.loading(false);
            if (err) {
                var action = {
                    type: LOGIN,
                    value: {
                        account: account,
                        password: password,
                        alert: new models.Alert(models.EAlertType.DANGER, lang.get('There was a problem with your login.'))
                    }
                };
                dispatch(action);
            }
            else {
                utils.Auth.login(res.accessToken);
                utils.Auth.cacheUser(res.user);
                utils.Page.redirect(utils.Addr.getReturnUrl());
            }
        });
    };
}
exports.login = login;
//# sourceMappingURL=form.js.map
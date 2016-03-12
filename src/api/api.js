"use strict";
const http = require('./http');
const users_1 = require('./client/users');
const members_1 = require('./client/members');
const orgs_1 = require('./client/orgs');
class API {
    constructor(options) {
        this.options = options;
        this.request = new http.WebRequest();
        var apiRequest = new http.APIRequest(options);
        this.users = new users_1.default(apiRequest);
        this.members = new members_1.default(apiRequest);
        this.orgs = new orgs_1.default(apiRequest);
    }
}
exports.API = API;
//# sourceMappingURL=api.js.map
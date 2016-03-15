"use strict";
class Orgs {
    constructor(request) {
        this.request = request;
    }
    create(org, cb) {
        this.request.post('/orgs', org, cb);
    }
    delete(password, cb) {
        this.request.delete('/orgs', {
            password: password
        }, cb);
    }
    edit(org, cb) {
        this.request.put('/orgs/' + org.id, org, cb);
    }
    get(id, cb) {
        this.request.get('/orgs/' + id, null, cb);
    }
    list(parentID, cb) {
        this.request.get('/orgs', {
            parentID: parentID,
        }, cb);
    }
    search(idCardNumber, cb) {
        this.request.post('/orgs/actions/search', {
            idCardNumber: idCardNumber,
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Orgs;
//# sourceMappingURL=orgs.js.map
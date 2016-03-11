"use strict";
class Members {
    constructor(request) {
        this.request = request;
    }
    create(member, cb) {
        this.request.post('/members', member, cb);
    }
    delete(password, cb) {
        this.request.delete('/members', {
            password: password
        }, cb);
    }
    edit(member, cb) {
        this.request.put('/members/' + member.id, member, cb);
    }
    get(id, cb) {
        this.request.get('/members/' + id, null, cb);
    }
    list(orgID, cb) {
        this.request.get('/members', {
            orgID: orgID,
        }, cb);
    }
    search(idCardNumber, cb) {
        this.request.post('/members/actions/search', {
            idCardNumber: idCardNumber,
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Members;
//# sourceMappingURL=members.js.map
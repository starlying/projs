"use strict";
class Members {
    constructor(request) {
        this.request = request;
    }
    delete(password, cb) {
        this.request.delete('/members', {
            password: password
        }, cb);
    }
    edit(data, cb) {
        this.request.patch('/members', data, cb);
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
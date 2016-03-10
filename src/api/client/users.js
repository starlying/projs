"use strict";
class Users {
    constructor(request) {
        this.request = request;
    }
    delete(password, cb) {
        this.request.delete('/users', {
            password: password
        }, cb);
    }
    edit(data, cb) {
        this.request.patch('/users', data, cb);
    }
    login(username, password, cb) {
        this.request.post('/users/actions/login', {
            username: username,
            password: password
        }, cb);
    }
    search(idCardNumber, cb) {
        this.request.post('/users/actions/search', {
            idCardNumber: idCardNumber,
        }, cb);
    }
    logout(cb) {
        this.request.post('/users/actions/logout', null, cb);
    }
    passwordForgot(email, cb) {
        this.request.post('/users/actions/password_forgot', {
            email: email
        }, cb);
    }
    passwordReset(currentPassword, newPassword, cb) {
        this.request.post('/users/actions/password_reset', {
            currentPassword: currentPassword,
            newPassword: newPassword
        }, cb);
    }
    signup(username, email, password, cb) {
        this.request.post('/users', {
            username: username,
            email: email,
            password: password
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Users;
//# sourceMappingURL=users.js.map
"use strict";
class Private {
    constructor(request) {
        this.request = request;
    }
    webApps(username, appname, pagename, cb) {
        this.request.get('/private/web/apps/' + username + '/' + appname + '/' + pagename, null, cb);
    }
    webStars(username, cb) {
        this.request.get('/private/web/stars/' + username, null, cb);
    }
    webUsers(username, cb) {
        this.request.get('/private/web/users/' + username, null, cb);
    }
    getUploadAvatarUrl(username) {
        return this.request.getURL('/private/actions/upload_avatar/' + username);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Private;
//# sourceMappingURL=private.js.map
"use strict";
const client_1 = require('../../lib/client');
class appUtils {
    static isLoadApps() {
        return appUtils.appList !== null;
    }
    static loadAppsIfNotExists(success) {
        if (!appUtils.isLoadApps()) {
            client_1.default.apps.list((err, res) => {
                appUtils.appList = res;
                success();
            });
        }
        else {
            success();
        }
    }
    static getApps() {
        return appUtils.appList;
    }
    static getApp(id) {
        var retval = null;
        if (appUtils.appList) {
            appUtils.appList.forEach((app) => {
                if (app.id === id) {
                    retval = app;
                }
            });
        }
        return retval;
    }
    static delete(owner, name, success) {
    }
    static create(name, _private, category, templateId) {
    }
}
appUtils.appList = null;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = appUtils;
//# sourceMappingURL=appUtils.js.map
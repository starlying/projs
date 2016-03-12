"use strict";
class User {
    constructor() {
    }
}
exports.User = User;
class Member {
    constructor() {
    }
}
exports.Member = Member;
class Org {
    constructor() {
    }
}
exports.Org = Org;
class Upload {
    constructor() {
    }
}
exports.Upload = Upload;
(function (EAlertType) {
    EAlertType[EAlertType["SUCCESS"] = 0] = "SUCCESS";
    EAlertType[EAlertType["INFO"] = 1] = "INFO";
    EAlertType[EAlertType["WARNING"] = 2] = "WARNING";
    EAlertType[EAlertType["DANGER"] = 3] = "DANGER";
})(exports.EAlertType || (exports.EAlertType = {}));
var EAlertType = exports.EAlertType;
class EAlertTypeUtils {
    static getValue(type) {
        if (type === EAlertType.SUCCESS) {
            return "success";
        }
        else if (type === EAlertType.INFO) {
            return "info";
        }
        else if (type === EAlertType.WARNING) {
            return "warning";
        }
        else if (type === EAlertType.DANGER) {
            return "danger";
        }
        return "";
    }
}
exports.EAlertTypeUtils = EAlertTypeUtils;
class Alert {
    constructor(alertType, message, pageUrl, pageText) {
        this.alertType = alertType;
        this.message = message;
        this.pageUrl = pageUrl;
        this.pageText = pageText;
    }
}
exports.Alert = Alert;
(function (ERestMethod) {
    ERestMethod[ERestMethod["GET"] = 0] = "GET";
    ERestMethod[ERestMethod["POST"] = 1] = "POST";
    ERestMethod[ERestMethod["PUT"] = 2] = "PUT";
    ERestMethod[ERestMethod["DELETE"] = 3] = "DELETE";
    ERestMethod[ERestMethod["PATCH"] = 4] = "PATCH";
})(exports.ERestMethod || (exports.ERestMethod = {}));
var ERestMethod = exports.ERestMethod;
class ERestMethodUtils {
    static getValue(method) {
        if (method === ERestMethod.GET) {
            return "GET";
        }
        else if (method === ERestMethod.POST) {
            return "POST";
        }
        else if (method === ERestMethod.PUT) {
            return "PUT";
        }
        else if (method === ERestMethod.DELETE) {
            return "DELETE";
        }
        else if (method === ERestMethod.PATCH) {
            return "PATCH";
        }
        return "POST";
    }
    static equals(methodStr, method) {
        return (ERestMethodUtils.getValue(method) === methodStr);
    }
    static errorCode(status) {
        switch (status) {
            case Const.STATUS_BAD_REQUEST:
                return 'Bad Request';
            case Const.STATUS_UNAUTHORIZED:
                return 'Unauthorized';
            case Const.STATUS_PAYMENT_REQUIRED:
                return 'Payment Required';
            case Const.STATUS_FORBIDDEN:
                return 'Forbidden';
            case Const.STATUS_NOT_FOUND:
                return 'Not Found';
            case Const.STATUS_METHOD_NOT_ALLOWED:
                return 'Method Not Allowed';
            case Const.STATUS_NOT_ACCEPTABLE:
                return 'Not Acceptable';
            case Const.STATUS_PROXY_AUTHENTICATION_REQUIRED:
                return 'Proxy Authentication Required';
            case Const.STATUS_REQUEST_TIMEOUT:
                return 'Request Timeout';
            case Const.STATUS_CONFLICT:
                return 'Conflict';
            case Const.STATUS_GONE:
                return 'Gone';
            case Const.STATUS_LENGTH_REQUIRED:
                return 'Length Required';
            case Const.STATUS_INTERNAL_SERVER_ERROR:
                return 'Internal Server Error';
        }
        return 'Unknown Error';
    }
}
exports.ERestMethodUtils = ERestMethodUtils;
class Const {
}
Const.ACCESS_TOKEN = "X-Get3W-Access-Token";
Const.USER = "X-Get3W-User";
Const.MEMBER = "X-Get3W-Member";
Const.ORG = "X-Get3W-Org";
Const.FROM_LOCAL = "local";
Const.FROM_CLOUD = "cloud";
Const.DATA_TYPE_TEXT = "Text";
Const.DATA_TYPE_TEXT_AREA = "TextArea";
Const.DATA_TYPE_PASSWORD = "Password";
Const.DATA_TYPE_EDITOR = "Editor";
Const.DATA_TYPE_SELECT = "Select";
Const.DATA_TYPE_CHECK_BOX = "CheckBox";
Const.DATA_TYPE_COLOR = "Color";
Const.PAYLOAD_STATUS_ADDED = "added";
Const.PAYLOAD_STATUS_MODIFIED = "modified";
Const.PAYLOAD_STATUS_REMOVED = "removed";
Const.PAYLOAD_TYPE_CONFIG = "config";
Const.PAYLOAD_TYPE_SITE = "site";
Const.PAYLOAD_TYPE_PAGE = "page";
Const.PAYLOAD_TYPE_SECTION = "section";
Const.STATUS_NOT_MODIFIED = 304;
Const.STATUS_BAD_REQUEST = 400;
Const.STATUS_UNAUTHORIZED = 401;
Const.STATUS_PAYMENT_REQUIRED = 402;
Const.STATUS_FORBIDDEN = 403;
Const.STATUS_NOT_FOUND = 404;
Const.STATUS_METHOD_NOT_ALLOWED = 405;
Const.STATUS_NOT_ACCEPTABLE = 406;
Const.STATUS_PROXY_AUTHENTICATION_REQUIRED = 407;
Const.STATUS_REQUEST_TIMEOUT = 408;
Const.STATUS_CONFLICT = 409;
Const.STATUS_GONE = 410;
Const.STATUS_LENGTH_REQUIRED = 411;
Const.STATUS_INTERNAL_SERVER_ERROR = 500;
exports.Const = Const;
//# sourceMappingURL=models.js.map
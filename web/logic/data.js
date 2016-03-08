"use strict";
const models = require('../../api/models');
(function (EPayloadSource) {
    EPayloadSource[EPayloadSource["SERVER_ACTION"] = 0] = "SERVER_ACTION";
    EPayloadSource[EPayloadSource["VIEW_ACTION"] = 1] = "VIEW_ACTION";
})(exports.EPayloadSource || (exports.EPayloadSource = {}));
var EPayloadSource = exports.EPayloadSource;
(function (EActionType) {
    EActionType[EActionType["NONE"] = 0] = "NONE";
    EActionType[EActionType["SERVER_VALIDATE"] = 1] = "SERVER_VALIDATE";
    EActionType[EActionType["SERVER_USER_UPDATE"] = 2] = "SERVER_USER_UPDATE";
    EActionType[EActionType["VIEW_OPEN_WINDOW"] = 3] = "VIEW_OPEN_WINDOW";
    EActionType[EActionType["VIEW_OPEN_MAIN"] = 4] = "VIEW_OPEN_MAIN";
    EActionType[EActionType["VIEW_OPEN_MENU"] = 5] = "VIEW_OPEN_MENU";
    EActionType[EActionType["VIEW_WINDOW_ALERT"] = 6] = "VIEW_WINDOW_ALERT";
    EActionType[EActionType["VIEW_MAIN_CLICK"] = 7] = "VIEW_MAIN_CLICK";
    EActionType[EActionType["VIEW_READY"] = 8] = "VIEW_READY";
})(exports.EActionType || (exports.EActionType = {}));
var EActionType = exports.EActionType;
(function (EClickSource) {
    EClickSource[EClickSource["WINDOWS"] = 0] = "WINDOWS";
    EClickSource[EClickSource["MAIN"] = 1] = "MAIN";
})(exports.EClickSource || (exports.EClickSource = {}));
var EClickSource = exports.EClickSource;
(function (EMainType) {
    EMainType[EMainType["NONE"] = 0] = "NONE";
    EMainType[EMainType["EDIT"] = 1] = "EDIT";
    EMainType[EMainType["LIST"] = 2] = "LIST";
    EMainType[EMainType["VIEW"] = 3] = "VIEW";
    EMainType[EMainType["DASHBOARD_ACCOUNT"] = 4] = "DASHBOARD_ACCOUNT";
    EMainType[EMainType["DASHBOARD_CREATE"] = 5] = "DASHBOARD_CREATE";
    EMainType[EMainType["DASHBOARD_LIST"] = 6] = "DASHBOARD_LIST";
})(exports.EMainType || (exports.EMainType = {}));
var EMainType = exports.EMainType;
(function (EWindowType) {
    EWindowType[EWindowType["NONE"] = 0] = "NONE";
    EWindowType[EWindowType["FORM"] = 1] = "FORM";
})(exports.EWindowType || (exports.EWindowType = {}));
var EWindowType = exports.EWindowType;
(function (EMenuType) {
    EMenuType[EMenuType["NONE"] = 0] = "NONE";
    EMenuType[EMenuType["COMPONENT"] = 1] = "COMPONENT";
    EMenuType[EMenuType["SECTION"] = 2] = "SECTION";
    EMenuType[EMenuType["PAGE"] = 3] = "PAGE";
    EMenuType[EMenuType["FILE"] = 4] = "FILE";
})(exports.EMenuType || (exports.EMenuType = {}));
var EMenuType = exports.EMenuType;
class DataInfo {
    constructor(attributeName, attributeValue, dataType, required, displayName, tips, placeholder) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
        this.dataType = dataType;
        this.required = required;
        this.displayName = displayName;
        this.tips = tips;
        this.placeholder = placeholder;
    }
}
exports.DataInfo = DataInfo;
class ActionInfo {
    constructor(actionType, translateInfo, serverJSON) {
        this.actionType = actionType;
        this.translateInfo = translateInfo;
        this.serverJSON = serverJSON;
    }
}
exports.ActionInfo = ActionInfo;
class PayloadInfo {
    constructor(source, action) {
        this.source = source;
        this.action = action;
    }
}
exports.PayloadInfo = PayloadInfo;
class FormInfo {
    constructor(formName, isRequired) {
        this.formName = formName;
        this.isRequired = isRequired;
    }
}
exports.FormInfo = FormInfo;
class PairInfo {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.PairInfo = PairInfo;
class StateInfo {
    constructor() {
        this.actionType = EActionType.NONE;
        this.windowType = EWindowType.NONE;
        this.mainType = EMainType.NONE;
        this.menuType = EMenuType.NONE;
        this.windowProps = null;
        this.windowAlert = null;
        this.mainProps = null;
        this.menuProps = null;
        this.user = new models.User();
        this.username = '';
    }
}
exports.StateInfo = StateInfo;
function getDataProps(attributeName, attributeValue, required, displayName, tips, placeholder, onChange) {
    return {
        key: attributeName,
        ref: attributeName,
        attributeName: attributeName,
        attributeValue: attributeValue,
        required: required,
        displayName: displayName,
        tips: tips,
        placeholder: placeholder,
        onChange: onChange
    };
}
exports.getDataProps = getDataProps;
//# sourceMappingURL=data.js.map
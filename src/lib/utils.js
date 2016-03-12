"use strict";
const scriptjs = require('scriptjs');
const swal = require('sweetalert');
const $ = require('jquery');
const uuid = require('node-uuid');
const moment = require('moment');
const _ = require('lodash');
const mustache = require('mustache');
const models = require('../api/models');
const base64 = require('./utils/base64');
const utf8 = require('./utils/utf8');
const client_1 = require('./client');
const release_1 = require('./release');
class Component {
    static triggerEditor(value, onChange) {
        Component.lastEditorID = "ueditor_" + Math.random();
        Ajax.loadScript(Ajax.SCRIPT_URL_UEDITOR_1, () => {
            Ajax.loadScript(Ajax.SCRIPT_URL_UEDITOR_2, () => {
                Ajax.loadScript(Ajax.SCRIPT_URL_UEDITOR_3, () => {
                    clearTimeout(Component.lastEditorTimer);
                    Component.lastEditorTimer = setTimeout(function () {
                        var editor = UE.getEditor(Component.lastEditorID);
                        editor.ready(function () {
                            try {
                                this.setContent(value);
                            }
                            catch (e) { }
                            if (onChange) {
                                editor.addListener('contentChange', function () {
                                    onChange(editor.getContent());
                                });
                            }
                        });
                    }, 100);
                });
            });
        });
    }
    static getEditorInnerHTML(value, height, onChange) {
        Component.triggerEditor(value, onChange);
        return '<script id="' + Component.lastEditorID + '" name="' + Component.lastEditorID + '" type="text/plain" style="width:100%height:' + (height || 350) + 'px"></script>';
    }
    static getEditorContent() {
        return UE.getEditor(Component.lastEditorID).getContent();
    }
    static addLengthUnit(length) {
        if (length) {
            var regex = /^(-?[\d+\.\-]+)([a-z]+|%)$/i;
            if (!regex.test(length)) {
                length += "px";
            }
        }
        return length;
    }
}
exports.Component = Component;
class DOM {
    static stop(e) {
        if (e) {
            e.stopPropagation();
        }
    }
    static prevent(e) {
        if (e) {
            e.preventDefault();
        }
    }
    static getComponentId(sectionPath, componentOrder) {
        return sectionPath + "-" + componentOrder;
    }
    static target(target) {
        return $(target);
    }
    static addClass(target, className) {
        $(target).addClass(className);
    }
    static removeClass(target, className) {
        $(target).removeClass(className);
    }
    static attr(target, attributeName) {
        return $(target).attr(attributeName);
    }
    static scrollTo(elementId) {
        setTimeout(() => {
            var scrollPane = $('.box_inner');
            var scrollTarget = $("#" + elementId);
            if (scrollTarget.length) {
                var scrollY = scrollTarget.offset().top + scrollPane.scrollTop() - scrollPane.offset().top;
                scrollPane.animate({ scrollTop: scrollY }, 500, 'swing');
            }
        }, 100);
    }
    static loading(loading) {
        loading ? $('#g3w-loading').show() : $('#g3w-loading').hide();
    }
    static mask(mask) {
        mask ? $('#g3w-windows-mask').show() : $('#g3w-windows-mask').hide();
    }
    static winHeight(substract) {
        return ($(window).height() - substract);
    }
    static winWidth(substract) {
        return ($(window).width() - substract);
    }
    static getValue(el) {
        if (el && typeof el.getValue === "function") {
            return el.getValue();
        }
        return "";
    }
    static getAbsoluteStyle(elId, width, height) {
        var position = $('#' + elId).offset();
        var isRight = position.left + width + 20 > $(document).width();
        var isBottom = position.top + height + 20 > $(document).height();
        var style = {
            top: 0, left: 0
        };
        if (isRight && isBottom) {
            style = {
                bottom: 0, right: 0
            };
        }
        else if (isRight) {
            style = {
                top: 0, right: 0
            };
        }
        else if (isBottom) {
            style = {
                bottom: 0, left: 0
            };
        }
        style.width = width + 'px';
        style.position = 'absolute';
        return style;
    }
    static getAbsoluteStyleMain(width, height) {
        var style = null;
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        var isRight = winWidth < Cache.Mouse_pageX + halfWidth;
        var isBottom = winHeight < Cache.Mouse_pageY + halfHeight;
        if (isRight && isBottom) {
            var right = winWidth - Cache.Mouse_pageX - halfWidth;
            if (right <= 0)
                right = 30;
            var bottom = winHeight - Cache.Mouse_pageY - halfHeight;
            if (bottom <= 0)
                bottom = 30;
            style = {
                right: right + 'px',
                bottom: bottom + 'px'
            };
        }
        else if (isRight) {
            var right = winWidth - Cache.Mouse_pageX - halfWidth;
            if (right <= 0)
                right = 30;
            var top = Cache.Mouse_pageY - halfHeight;
            if (top <= 0)
                top = 10;
            style = {
                right: right + 'px',
                top: top + 'px'
            };
        }
        else if (isBottom) {
            var left = Cache.Mouse_pageX - halfWidth - 274;
            var bottom = winHeight - Cache.Mouse_pageY - halfHeight;
            if (bottom <= 0)
                bottom = 30;
            style = {
                left: left + 'px',
                bottom: bottom + 'px'
            };
        }
        else {
            var left = Cache.Mouse_pageX - halfWidth - 274;
            var top = Cache.Mouse_pageY - halfHeight;
            if (top <= 0)
                top = 10;
            style = {
                left: left + 'px',
                top: top + 'px'
            };
        }
        style.width = width + 'px';
        style.position = 'absolute';
        return style;
    }
    static momentLocale() {
        moment.locale('zh-cn', {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
                LT: 'Ah点mm分',
                L: 'YYYY-MM-DD',
                LL: 'YYYY年MMMD日',
                LLL: 'YYYY年MMMD日LT',
                LLLL: 'YYYY年MMMD日ddddLT',
                l: 'YYYY-MM-DD',
                ll: 'YYYY年MMMD日',
                lll: 'YYYY年MMMD日LT',
                llll: 'YYYY年MMMD日ddddLT'
            },
            calendar: {
                sameDay: "[今天]LT",
                nextDay: '[明天]LT',
                nextWeek: '[下周]LT',
                lastDay: '[昨天]LT',
                lastWeek: '[上周]LT',
                sameElse: 'LL'
            }
        });
    }
}
exports.DOM = DOM;
class Tips {
    static info(message) {
        if ($('.console_extra_tips .info').length === 0) {
            $('body').append("<div class='console_extra_tips'><div class='info'>" + message + "</span></div>");
        }
        else {
            $('.console_extra_tips .info').html(message).fadeIn();
        }
        setTimeout(function () {
            $('.console_extra_tips .info').fadeOut();
        }, 3000);
    }
    static success(message) {
        if ($('.console_extra_tips .success').length === 0) {
            $('body').append("<div class='console_extra_tips'><div class='success'>" + message + "</span></div>");
        }
        else {
            $('.console_extra_tips .success').html(message).fadeIn();
        }
        setTimeout(function () {
            $('.console_extra_tips .success').fadeOut();
        }, 3000);
    }
    static error(message) {
        if ($('.console_extra_tips .error').length === 0) {
            $('body').append("<div class='console_extra_tips'><div class='error'>" + message + "</span></div>");
        }
        else {
            $('.console_extra_tips .error').html(message).fadeIn();
        }
        setTimeout(function () {
            $('.console_extra_tips .error').fadeOut();
        }, 3000);
    }
}
exports.Tips = Tips;
class Swal {
    static tip(title, text, isTimer) {
        if (isTimer) {
            swal({
                title: title,
                text: text,
                timer: 2000,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                html: true
            });
        }
        else {
            swal({
                title: title,
                text: text,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                html: true
            });
        }
    }
    static success(title, text, isNotTimer, onClick) {
        if (isNotTimer) {
            swal({
                title: title,
                text: text,
                type: "success",
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                html: true
            }, onClick);
        }
        else {
            swal({
                title: title,
                text: text,
                type: "success",
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                timer: 2000,
                html: true
            }, onClick);
        }
    }
    static error(err, callback) {
        swal({
            title: err.message,
            text: '',
            type: "error",
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            html: true
        }, callback);
    }
    static warning(title, text, isNotTimer) {
        if (isNotTimer) {
            swal({
                title: title,
                text: text,
                type: "warning",
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                html: true
            });
        }
        else {
            swal({
                title: title,
                text: text,
                type: "warning",
                timer: 2000,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                html: true
            });
        }
    }
    static delete(title, text, confirm) {
        swal({
            title: title,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f36c60",
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            closeOnConfirm: true,
            html: true
        }, confirm);
    }
    static confirm(title, text, confirm, confirmButtonText, closeOnConfirm) {
        if (typeof (closeOnConfirm) === 'undefined') {
            closeOnConfirm = true;
        }
        swal({
            title: title,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f36c60",
            confirmButtonText: confirmButtonText || '提交',
            cancelButtonText: '取消',
            closeOnConfirm: closeOnConfirm,
            html: true
        }, confirm);
    }
}
exports.Swal = Swal;
class String {
    static equalsIgnoreCase(str1, str2) {
        return (str1 && str1.toUpperCase()) === (str2 && str2.toUpperCase());
    }
    static isUsername(str) {
        var regPartton = /^[A-Za-z0-9.\-_]+$/;
        return regPartton.test(str);
    }
    static isEmail(str) {
        var regPartton = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return regPartton.test(str);
    }
    static isPhone(str) {
        var regPartton = /1[3-8]+\d{9}/;
        return regPartton.test(str);
    }
    static isFileName(name) {
        return /^[^\\/:\*\.\?"<>\|]+$/.test(name);
    }
    static isImage(name) {
        return /(\.|\/)(gif|jpe?g|png)$/i.test(name);
    }
    static getUnixTimestamp() {
        return Math.round(new Date().getTime() / 1000);
    }
    static getObjectId(idx) {
        return new Date().getTime() + ((typeof idx === 'number') ? (idx + 1) : 0);
    }
    static uuid_v1() {
        return uuid.v1().replace(/-/g, "");
    }
    static uuid_v4() {
        return uuid.v4().replace(/-/g, "");
    }
    static getByteCount(str) {
        if (!str)
            return 0;
        var ch;
        var count = 0;
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            do {
                count++;
                ch = ch >> 8;
            } while (ch);
        }
        return count;
    }
    static mustache(tpl, data) {
        return mustache.render(tpl, data);
    }
}
exports.String = String;
class Translate {
    static base64ForUrlEncode(text) {
        if (!text)
            return "";
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        return encoded;
    }
    static base64ForUrlDecode(encoded) {
        if (!encoded)
            return "";
        encoded = encoded
            .replace(/\-/g, '+')
            .replace(/\_/g, '/');
        var bytes = base64.decode(encoded);
        var text = utf8.decode(bytes);
        return text;
    }
    static base64Encode(text) {
        if (!text)
            return "";
        var bytes = utf8.encode(text);
        return base64.encode(bytes);
    }
    static base64Decode(encoded) {
        if (!encoded)
            return "";
        var bytes = base64.decode(encoded);
        return utf8.decode(bytes);
    }
    static base64IsValid(base64) {
        if (!base64)
            return false;
        return /^[A-Za-z0-9\-_]+$/.test(base64);
    }
    static arrayToString(list) {
        var retval = '';
        if (list && list.length > 0) {
            list.forEach(function (item) {
                retval += item + ',';
            });
            retval = retval.substr(0, retval.length - 1);
        }
        return retval;
    }
    static toObject(json) {
        var obj = {};
        try {
            obj = $.parseJSON(json);
        }
        catch (e) { }
        return obj || {};
    }
    static toJSON(data) {
        return $.parseJSON(JSON.stringify(data));
    }
    static toNumber(str) {
        return parseInt(str) || 0;
    }
    static toBoolean(str) {
        return str ? (str === 'true') : false;
    }
    static toDate(str) {
        return moment(str).toDate();
    }
    static toMoment(str) {
        return moment(str);
    }
    static timestampToDate(timestamp) {
        return moment.unix(timestamp).toDate();
    }
    static toShortDate(date) {
        return Translate.momentToShort(Translate.toMoment(date));
    }
    static toLongDate(date) {
        return Translate.momentToLong(Translate.toMoment(date));
    }
    static momentToShort(date) {
        return date.format("YYYY-MM-DD");
    }
    static momentToLong(date) {
        return date.format("YYYY-MM-DD HH:mm:ss");
    }
    static getValueToEditor(dataType, value) {
        value = value || "";
        if (dataType === models.Const.DATA_TYPE_TEXT_AREA || dataType === models.Const.DATA_TYPE_EDITOR) {
            value = value.replace(/\r/g, "");
            value = value.replace(/\n/g, "");
            value = value.replace(/<br \/>/gi, "\n");
            value = value.replace(/<br>/gi, "\n");
            value = value.replace(/<br\/>/gi, "\n");
        }
        value = value.trim();
        return value;
    }
    static getValueFromEditor(dataType, value) {
        value = value || "";
        if (dataType === models.Const.DATA_TYPE_TEXT_AREA || dataType === models.Const.DATA_TYPE_EDITOR) {
            value = value.replace(/\n/g, "<br />");
            value = value.replace(/\r/g, "");
        }
        value = value.trim();
        return value;
    }
    static encode(val) {
        return encodeURIComponent(val);
    }
    static decode(val) {
        return decodeURIComponent(val);
    }
}
exports.Translate = Translate;
class Page {
    static parseURL() {
        var username = '';
        var appname = '';
        var pathname = _.trim(location.pathname, '/');
        pathname = pathname.toLowerCase();
        var arr = pathname.split('/');
        var count = arr.length;
        if (count === 3) {
            username = arr[0];
            appname = arr[1];
        }
        return [username, appname];
    }
    static isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    static xDomain() {
        var config = {};
        config[release_1.default.domainAPI] = "/static/proxy.html";
        xdomain.slaves(config);
    }
    static getCookie(key) {
        var result = '';
        var str = document.cookie;
        var cookies = str ? str.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = parts.shift();
            var cookie = parts.join('=');
            if (key && key === name) {
                result = cookie;
                break;
            }
        }
        return result;
    }
    static setCookie(name, value, days) {
        if (typeof days === "undefined")
            days = 7;
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    static removeCookie(name) {
        Page.setCookie(name, "", -1);
    }
    static getCoEditKey() {
        return Page.getUrlVar('coEditKey');
    }
    static addLocale(url, locale) {
        return Page.addQuery(url, 'locale', locale);
    }
    static removeQuery(url, queryName) {
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {
            var prefix = encodeURIComponent(queryName) + '=';
            var pars = urlparts[1].split(/[&]/g);
            for (var i = pars.length; i-- > 0;) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }
            url = urlparts[0] + '?' + pars.join('&');
            return url;
        }
        else {
            return url;
        }
    }
    static addTimestamp(url) {
        return Page.addQuery(url, "ts", String.getUnixTimestamp());
    }
    static addQuery(url, queryName, queryValue) {
        if (url.indexOf(queryName + '=') !== -1) {
            url = Page.removeQuery(url, queryName);
        }
        var value = encodeURIComponent(queryValue);
        if (url && url.indexOf('?') !== -1) {
            url += '&' + queryName + '=' + value;
        }
        else {
            url += '?' + queryName + '=' + value;
        }
        return url;
    }
    static getUrlVar(key) {
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && decodeURIComponent(result[1]) || "";
    }
    static isProtocal(url) {
        if (!url)
            return false;
        return (url.indexOf("://") != -1 || _.startsWith(url, "javascript:void(0)"));
    }
    static redirectToReturnUrl(defaultUrl) {
        location.href = Addr.getReturnUrl(defaultUrl);
    }
    static redirect(url) {
        location.href = url;
    }
    static reload() {
        location.reload(true);
    }
    static downloadURL(url) {
        $('<iframe>', { src: url }).hide().appendTo('body');
    }
}
exports.Page = Page;
class Addr {
    static getOwnerUrl(owner) {
        return release_1.default.domain + "/" + owner + "/";
    }
    static getRepoUrl(owner, name) {
        return release_1.default.domain + "/" + owner + "/" + name + "/";
    }
    static getCloudUrl(url) {
        return release_1.default.domain + "/" + url.replace(/(^\/*)|(\/*$)/g, "");
    }
    static getAbsoluteUrl(url) {
        url = url || '';
        if (_.startsWith(url, 'http://') || _.startsWith(url, 'https://'))
            return url;
        var domain = release_1.default.domain;
        return domain + "/" + url.replace(/(^\/*)|(\/*$)/g, "");
    }
    static getUrl(url) {
        url = url || '';
        if (!Page.isProtocal(url)) {
            url = '/' + (_.trimStart(url, '/') || '');
        }
        return url;
    }
    static getImgUrl(url) {
        return Addr.getAbsoluteUrl('assets/img/' + url);
    }
    static getUrlCDN(relatedUrl) {
        if (relatedUrl) {
            relatedUrl = _.trim(relatedUrl, '/');
        }
        else {
            relatedUrl = '';
        }
        return release_1.default.domainCDN + '/' + relatedUrl;
    }
    static getReturnUrl(defaultUrl) {
        var reg = new RegExp("(^|&)" + "returnUrl" + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return defaultUrl || Addr.getUrl();
        }
    }
    static getCoEditUrl(appKey) {
        if (Page.getUrlVar('coEditKey')) {
            return location.href;
        }
        return location.href + '&coEditKey=' + appKey;
    }
    static getThirdLoginUrl(bindingType, returnUrl, username) {
        if (username) {
            return '/home/authlogin.html?isStart=true&bindingType=' + bindingType + "&username=" + username + '&returnUrl=' + returnUrl;
        }
        else {
            return '/home/authlogin.html?isStart=true&bindingType=' + bindingType + '&returnUrl=' + returnUrl;
        }
    }
    static getErrorUrl() {
        return Addr.getUrl('error.html');
    }
    static getAvatarUrl(user) {
        if (!user || !user.avatarUrl)
            return Addr.getImgUrl('avatar.png');
        return "http://avatars.assets." + release_1.default.rootDestination + "/" + user.avatarUrl;
    }
    static getPath(owner, name) {
        return owner + "/" + name;
    }
    static getEditUrl(path) {
        return Addr.getUrl(path + '/edit');
    }
    static getDashboardUrl() {
        return Addr.getUrl('dashboard/');
    }
    static getLoginUrl(returnUrl) {
        returnUrl = returnUrl || window.location.href;
        return Addr.getUrl('login/index.html?returnUrl=' + encodeURIComponent(returnUrl));
    }
    static getSignupUrl(returnUrl) {
        returnUrl = returnUrl || Addr.getReturnUrl();
        return Addr.getUrl('signup/index.html?returnUrl=' + encodeURIComponent(returnUrl));
    }
    static getForgetPasswordUrl(returnUrl) {
        returnUrl = returnUrl || Addr.getReturnUrl();
        return Addr.getUrl('forgetpassword/index.html?returnUrl=' + encodeURIComponent(returnUrl));
    }
}
exports.Addr = Addr;
class Auth {
    static getToken() {
        var cookie = Page.getCookie(models.Const.ACCESS_TOKEN);
        return (cookie && cookie !== 'undefined' && cookie !== 'null') ? cookie : '';
    }
    static getUser() {
        var cookie = Page.getCookie(models.Const.USER);
        return Translate.base64IsValid(cookie) ? JSON.parse(Translate.base64ForUrlDecode(cookie)) : null;
    }
    static getMember() {
        var cookie = Page.getCookie(models.Const.MEMBER);
        return Translate.base64IsValid(cookie) ? JSON.parse(Translate.base64ForUrlDecode(cookie)) : null;
    }
    static cache(accessToken, user, member) {
        client_1.default.setToken(accessToken);
        Ajax.setHeader(accessToken);
        Page.setCookie(models.Const.ACCESS_TOKEN, accessToken, 7);
        Page.setCookie(models.Const.USER, Translate.base64ForUrlEncode(JSON.stringify(user)), 7);
        Page.setCookie(models.Const.MEMBER, Translate.base64ForUrlEncode(JSON.stringify(member)), 7);
    }
    static removeCache() {
        Page.removeCookie(models.Const.ACCESS_TOKEN);
        Page.removeCookie(models.Const.USER);
        Page.removeCookie(models.Const.MEMBER);
        Ajax.setHeader('');
    }
}
exports.Auth = Auth;
class Ajax {
    static setHeader(token) {
        var headers = {};
        var authorization = 'Bearer ' + token;
        headers['Authorization'] = authorization;
        $.ajaxSetup({
            headers: headers
        });
    }
    static handleError(xhr, fail) {
        var errorMessage = '';
        if (xhr && xhr.responseText) {
            try {
                var responseObject = JSON.parse(xhr.responseText);
                var message = responseObject.exceptionMessage || responseObject.errorMessage || responseObject.message;
                errorMessage = message;
            }
            catch (e) { }
        }
        if (fail) {
            fail(errorMessage);
        }
        else {
            DOM.loading(false);
            if (errorMessage) {
                Tips.error(errorMessage);
            }
        }
    }
    static get(url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.GET, null, url, done, fail);
    }
    static post(parameters, url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.POST, parameters, url, done, fail);
    }
    static put(parameters, url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.PUT, parameters, url, done, fail);
    }
    static delete(url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.DELETE, null, url, done, fail);
    }
    static ajaxGet(parameters, url, done, fail) {
        Ajax.ajax("GET", parameters, url, done, fail);
    }
    static ajaxPost(parameters, url, done, fail) {
        Ajax.ajax("POST", parameters, url, done, fail);
    }
    static ajaxPut(parameters, url, done, fail) {
        Ajax.ajax("PUT", parameters, url, done, fail);
    }
    static ajaxDelete(parameters, url, done, fail) {
        Ajax.ajax("DELETE", parameters, url, done, fail);
    }
    static ajax(method, parameters, url, done, fail) {
        if (done) {
            $.ajax({
                url: url,
                type: method,
                data: parameters,
                dataType: 'json'
            })
                .done((data) => {
                done(data);
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
        else {
            $.ajax({
                url: url,
                type: method,
                data: parameters,
                dataType: 'json'
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
    }
    static ajaxJSON(method, parameters, url, done, fail) {
        var data = (method === models.ERestMethod.GET || typeof parameters == "string") ? parameters : JSON.stringify(parameters || {});
        if (done) {
            $.ajax({
                url: url,
                type: models.ERestMethodUtils.getValue(method),
                data: data,
                contentType: "application/json charset=utf-8",
                dataType: 'json'
            })
                .done((data) => {
                done(data);
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
        else {
            $.ajax({
                url: url,
                type: models.ERestMethodUtils.getValue(method),
                data: data,
                contentType: "application/json charset=utf-8",
                dataType: 'json'
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
    }
    static loadLibResources() {
        Ajax.loadScript("/lib/wysihtml/0.5.4/dist/wysihtml-toolbar.min.js", () => {
            Ajax.loadScript("/lib/wysihtml/0.5.4/parser_rules/advanced_and_extended.js");
        });
        Ajax.loadScript("/lib/ace/src-noconflict/ace.js");
    }
    static loadScript(url, success) {
        url = Addr.getAbsoluteUrl(url);
        if (Ajax.scriptUrlList[url]) {
            success && success();
        }
        else {
            scriptjs(url, function () {
                success && success();
                Ajax.scriptUrlList[url] = true;
            });
        }
    }
}
Ajax.SCRIPT_URL_UEDITOR_1 = "/lib/ueditor/1.4.3/ueditor.config.js";
Ajax.SCRIPT_URL_UEDITOR_2 = "/lib/ueditor/1.4.3/ueditor.all.min.js";
Ajax.SCRIPT_URL_UEDITOR_3 = "/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js";
Ajax.SCRIPT_URL_STRIPE = 'https://checkout.stripe.com/checkout.js';
Ajax.scriptUrlList = {};
exports.Ajax = Ajax;
class Cache {
}
exports.Cache = Cache;
//# sourceMappingURL=utils.js.map
import * as scriptjs from 'scriptjs'
import * as React from 'react'
import * as swal from 'sweetalert'
import * as $ from 'jquery'
import * as uuid from 'node-uuid'
import * as moment from 'moment'
import * as _ from 'lodash'
import * as mustache from 'mustache'
import * as http from '../api/http'
import * as models from '../api/models'
import * as base64 from './utils/base64'
import * as utf8 from './utils/utf8'
import client from './client'
import release from './release'

declare var xdomain

export class Component {
  private static lastEditorID: string
  private static lastEditorTimer

  private static triggerEditor(value: string, onChange?: Function) {
    Component.lastEditorID = "ueditor_" + Math.random()
    Ajax.loadScript(Ajax.SCRIPT_URL_UEDITOR_1, () => {
      Ajax.loadScript(Ajax.SCRIPT_URL_UEDITOR_2, () => {
        Ajax.loadScript(Ajax.SCRIPT_URL_UEDITOR_3, () => {
          clearTimeout(Component.lastEditorTimer)
          Component.lastEditorTimer = setTimeout(function () {
            var editor: any = UE.getEditor(Component.lastEditorID)
            editor.ready(function () {
              try {
                this.setContent(value)
              } catch (e) { }

              if (onChange) {
                editor.addListener('contentChange', function () {
                    onChange(editor.getContent())
                })
              }
            })
          }, 100)
        })
      })
    })
  }

  static getEditorInnerHTML(value: string, height?: number, onChange?: Function) {
    Component.triggerEditor(value, onChange)
    return '<script id="' + Component.lastEditorID + '" name="' + Component.lastEditorID + '" type="text/plain" style="width:100%height:' + (height || 350) + 'px"></script>'
  }

  static getEditorContent() {
    return UE.getEditor(Component.lastEditorID).getContent()
  }

  static addLengthUnit(length: string): string {
    if (length) {
      var regex = /^(-?[\d+\.\-]+)([a-z]+|%)$/i
      if (!regex.test(length)) {
        length += "px"
      }
    }
    return length
  }
}

export class UploadProps {
  static getAvatarProps(username: string, success: (result: {avatarUrl: string}) => void, fail?: (message: string) => void) {
    const url = client.users.getUploadAvatarUrl(username)
    return UploadProps.getProps(url, false, "image/*", success, fail)
  }

  static getProps(url: string, multi: boolean, accept: string, success: (obj: any) => void, fail?: (message: string) => void, progress?: () => void) {
    const props = {
      action: url,
      headers: {
        'X-Get3W-Access-Token': Page.getCookie(models.Const.ACCESS_TOKEN)
      },
      multiple: multi,
      dataType: 'json',
      accept: accept,
      maxFileSize: 5000000, // 5 MB
      withCredentials: true,
      onStart(files) {
        DOM.loading(true)
      },
      onSuccess(ret) {
        DOM.loading(false)
        success(JSON.stringify(ret))
      },
      onProgress(step, file) {
        DOM.loading(true)
        progress && progress()
      },
      onError(err) {
        console.log('onError', err);
        DOM.loading(false)
        fail ? fail(err.message) : Tips.error(err.message)
      },
    }
    return props
  }
}

export class DOM {
  static stop(e: React.SyntheticEvent) {
    if (e) {
      e.stopPropagation()
    }
  }

  static prevent(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault()
    }
  }

  static getComponentId(sectionPath: string, componentOrder: number): string {
    return sectionPath + "-" + componentOrder
  }

  static target(target) {
    return $(target)
  }

  static addClass(target, className: string) {
    $(target).addClass(className)
  }

  static removeClass(target, className: string) {
    $(target).removeClass(className)
  }

  static attr(target, attributeName: string): string {
    return $(target).attr(attributeName)
  }

  static scrollTo(elementId): void {
    setTimeout(() => {
      var scrollPane = $('.box_inner')
      var scrollTarget = $("#" + elementId)
      if (scrollTarget.length) {
        var scrollY = scrollTarget.offset().top + scrollPane.scrollTop() - scrollPane.offset().top
        scrollPane.animate({ scrollTop: scrollY }, 500, 'swing')
      }
    }, 100)
  }

  static loading(loading: boolean): void {
    loading ? $('#g3w-loading').show() : $('#g3w-loading').hide()
  }

  static mask(mask: boolean): void {
    mask ? $('#g3w-windows-mask').show() : $('#g3w-windows-mask').hide()
  }

  static winHeight(substract: number): number {
    return ($(window).height() - substract)
  }

  static winWidth(substract: number): number {
    return ($(window).width() - substract)
  }

  static getValue(el: any): string {
    if (el && typeof el.getValue === "function"){
      return el.getValue()
    }
    return ""
  }

  static getAbsoluteStyle(elId: string, width: number, height: number): Object {
    var position = $('#' + elId).offset()
    var isRight = position.left + width + 20 > $(document).width()
    var isBottom = position.top + height + 20 > $(document).height()

    var style: any = {
        top: 0, left: 0
    }
    if (isRight && isBottom) {
      style = {
        bottom: 0, right: 0
      }
    } else if (isRight) {
      style = {
        top: 0, right: 0
      }
    } else if (isBottom) {
      style = {
        bottom: 0, left: 0
      }
    }
    style.width = width + 'px'
    style.position = 'absolute'

    return style
  }

  static getAbsoluteStyleMain(width: number, height: number) {
    var style = null

    var winWidth = $(window).width()
    var winHeight = $(window).height()
    var halfWidth = width / 2
    var halfHeight = height / 2

    var isRight: boolean = winWidth < Cache.Mouse_pageX + halfWidth
    var isBottom: boolean = winHeight < Cache.Mouse_pageY + halfHeight
    if (isRight && isBottom) {
        var right = winWidth - Cache.Mouse_pageX - halfWidth
        if (right <= 0) right = 30
        var bottom = winHeight - Cache.Mouse_pageY - halfHeight
        if (bottom <= 0) bottom = 30
        style = {
            right: right + 'px',
            bottom: bottom + 'px'
        }
    } else if (isRight) {
        var right = winWidth - Cache.Mouse_pageX - halfWidth
        if (right <= 0) right = 30
        var top = Cache.Mouse_pageY - halfHeight
        if (top <= 0) top = 10
        style = {
            right: right + 'px',
            top: top + 'px'
        }
    } else if (isBottom) {
        var left = Cache.Mouse_pageX - halfWidth - 274
        var bottom = winHeight - Cache.Mouse_pageY - halfHeight
        if (bottom <= 0) bottom = 30
        style = {
            left: left + 'px',
            bottom: bottom + 'px'
        }
    } else {
        var left = Cache.Mouse_pageX - halfWidth - 274
        var top = Cache.Mouse_pageY - halfHeight
        if (top <= 0) top = 10
        style = {
            left: left + 'px',
            top: top + 'px'
        }
    }
    style.width = width + 'px'
    style.position = 'absolute'

    return style
  }

  static momentLocale(): void {
      moment.locale('zh-cn', {
          months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
          monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
          weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
          weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
          weekdaysMin: "日_一_二_三_四_五_六".split("_"),
          longDateFormat: {
              LT: 'Ah点mm分',
              //LTS: 'Ah点m分s秒',
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
          //week: {
          //    dow: 1, // Monday is the first day of the week.
          //    doy: 4  // The week that contains Jan 4th is the first week of the year.
          //}
      })
  }
}

export class Tips {
  static info(message: string) {
      if ($('.console_extra_tips .info').length === 0) {
          $('body').append("<div class='console_extra_tips'><div class='info'>" + message + "</span></div>")
      } else {
          $('.console_extra_tips .info').html(message).fadeIn()
      }
      setTimeout(function () {
          $('.console_extra_tips .info').fadeOut()
      }, 3000)
  }

  static success(message: string) {
      if ($('.console_extra_tips .success').length === 0) {
          $('body').append("<div class='console_extra_tips'><div class='success'>" + message + "</span></div>")
      } else {
          $('.console_extra_tips .success').html(message).fadeIn()
      }
      setTimeout(function () {
          $('.console_extra_tips .success').fadeOut()
      }, 3000)
  }

  static error(message: string) {
      if ($('.console_extra_tips .error').length === 0) {
          $('body').append("<div class='console_extra_tips'><div class='error'>" + message + "</span></div>")
      } else {
          $('.console_extra_tips .error').html(message).fadeIn()
      }
      setTimeout(function () {
          $('.console_extra_tips .error').fadeOut()
      }, 3000)
  }
}

export class Swal {
  static tip(title: string, text?: string, isTimer?: boolean) {
      if (isTimer) {
          swal({
              title: title,
              text: text,
              timer: 2000,
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              html: true
          })
      } else {
          swal({
              title: title,
              text: text,
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              html: true
          })
      }
  }

  static success(title: string, text?: string, isNotTimer?: boolean, onClick?: () => void) {
      if (isNotTimer) {
          swal({
              title: title,
              text: text,
              type: "success",
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              html: true
          }, onClick)
      } else {
          swal({
              title: title,
              text: text,
              type: "success",
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              timer: 2000,
              html: true
          }, onClick)
      }
  }

  static error(err: models.Error, callback?: () => void) {
    swal({
      title: err.message,
      text: '',
      type: "error",
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      html: true
    }, callback)
  }

  static warning(title: string, text?: string, isNotTimer?: boolean) {
    if (isNotTimer) {
      swal({
        title: title,
        text: text,
        type: "warning",
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        html: true
      })
    } else {
      swal({
        title: title,
        text: text,
        type: "warning",
        timer: 2000,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        html: true
      })
    }
  }

  static delete(title: string, text: string, confirm: (isConfirm: boolean) => void) {
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
      }, confirm)
  }

  static confirm(title: string, text: string, confirm: (isConfirm: boolean) => void, confirmButtonText?: string, closeOnConfirm?: boolean) {
      if (typeof (closeOnConfirm) === 'undefined') {
          closeOnConfirm = true
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
      }, confirm)
  }
}

export class String {
  static equalsIgnoreCase(str1: string, str2: string) {
      return (str1 && str1.toUpperCase()) === (str2 && str2.toUpperCase())
  }

  static isUsername(str: string): boolean {
      var regPartton = /^[A-Za-z0-9.\-_]+$/
      return regPartton.test(str)
  }

  static isEmail(str: string): boolean {
      var regPartton = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
      return regPartton.test(str)
  }

  static isPhone(str: string): boolean {
      var regPartton = /1[3-8]+\d{9}/
      return regPartton.test(str)
  }

  static isFileName(name): boolean {
      return /^[^\\/:\*\.\?"<>\|]+$/.test(name)
  }

  static isImage(name): boolean {
      return /(\.|\/)(gif|jpe?g|png)$/i.test(name)
  }

  static getUnixTimestamp(): number {
      return Math.round(new Date().getTime() / 1000)
  }

  static getObjectId(idx?: number): number {
      return new Date().getTime() + ((typeof idx === 'number') ? (idx + 1) : 0)
  }

  static uuid_v1() {
      return uuid.v1().replace(/-/g, "")
  }

  static uuid_v4() {
      return uuid.v4().replace(/-/g, "")
  }

  static getByteCount(str: string): number {
      if (!str) return 0
      var ch
      var count = 0
      for (var i = 0; i < str.length; i++) {
          ch = str.charCodeAt(i)
          do {
              count++
              ch = ch >> 8 // shift value down by 1 byte
          } while (ch)
      }
      return count
  }

  static mustache(tpl: string, data: Object): string {
      return mustache.render(tpl, data)
  }
}

export class Translate {
  //This function encodes to the RFC 4648 Spec where '+' is encoded as '-' and '/' is encoded as '_'. The padding character '=' is removed
  static base64ForUrlEncode(text: string): string {
    if (!text) return ""
    var bytes = utf8.encode(text)
    var encoded = base64.encode(bytes)
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, '') // Remove ending '='
    return encoded
  }

  static base64ForUrlDecode(encoded: string): string {
    if (!encoded) return ""
    encoded = encoded
      .replace(/\-/g, '+') // Convert '-' to '+'
      .replace(/\_/g, '/') // Convert '_' to '/'

    var bytes = base64.decode(encoded)
    var text = utf8.decode(bytes)
    return text
  }

  static base64Encode(text: string): string {
    if (!text) return ""
    var bytes = utf8.encode(text)
    return base64.encode(bytes)
  }

  static base64Decode(encoded: string): string {
    if (!encoded) return ""
    var bytes = base64.decode(encoded)
    return utf8.decode(bytes)
  }

  static base64IsValid(base64: string): boolean {
    if (!base64) return false
    return /^[A-Za-z0-9\-_]+$/.test(base64)
  }

  static arrayToString(list: Array<string>) {
    var retval = ''
    if (list && list.length > 0) {
      list.forEach(function (item: string) {
        retval += item + ','
      })
      retval = retval.substr(0, retval.length - 1)
    }
    return retval
  }

  static toObject(json: string): Object {
    var obj = {}
    try {
      obj = $.parseJSON(json)
    } catch (e) { }
    return obj || {}
  }

  static toJSON(data): any {
    return $.parseJSON(JSON.stringify(data))
  }

  static toNumber(str: string): number {
    return parseInt(str) || 0
  }

  static toBoolean(str: string): boolean {
    return str ? (str === 'true') : false
  }

  static toDate(str: string): Date {
    return moment(str).toDate()
  }

  static toMoment(str: string): moment.Moment {
    return moment(str)
  }

  static toMomentByDate(date: Date): moment.Moment {
    return moment(date)
  }

  static timestampToDate(timestamp: number): Date {
    return moment.unix(timestamp).toDate()
  }

  static toShortDate(date: string): string {
    return Translate.momentToShort(Translate.toMoment(date))
  }

  static toLongDate(date: string): string {
    return Translate.momentToLong(Translate.toMoment(date))
  }

  static momentToShort(date: moment.Moment): string {
    return date.format("YYYY-MM-DD")
  }

  static momentToLong(date: moment.Moment): string {
    return date.format("YYYY-MM-DD HH:mm:ss")
  }

  static getValueToEditor(dataType: string, value: string) {
    value = value || ""
    if (dataType === models.Const.DATA_TYPE_TEXT_AREA || dataType === models.Const.DATA_TYPE_EDITOR) {
      value = value.replace(/\r/g, "")
      value = value.replace(/\n/g, "")
      value = value.replace(/<br \/>/gi, "\n")
      value = value.replace(/<br>/gi, "\n")
      value = value.replace(/<br\/>/gi, "\n")
    }
    value = value.trim()
    return value
  }

  static getValueFromEditor(dataType: string, value: string) {
    value = value || ""
    if (dataType === models.Const.DATA_TYPE_TEXT_AREA || dataType === models.Const.DATA_TYPE_EDITOR) {
      value = value.replace(/\n/g, "<br />")
      value = value.replace(/\r/g, "")
    }
    value = value.trim()
    return value
  }

  static encode(val: string): string {
    return encodeURIComponent(val)
  }

  static decode(val: string): string {
    return decodeURIComponent(val)
  }
}

export class Page {
  static parseURL(): Array<string> {
    var username = ''
    var appname = ''

    var pathname = _.trim(location.pathname, '/')
    pathname = pathname.toLowerCase()
    var arr = pathname.split('/')
    var count = arr.length
    if (count === 3) {
      username = arr[0]
      appname = arr[1]
    }

    return [username, appname]
  }

  static isPc(): boolean {
    var userAgentInfo = navigator.userAgent
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  }

  static xDomain(): void {
    var config = {}
    config[release.domainAPI] = "/static/proxy.html"
    xdomain.slaves(config)
  }

  static getCookie(key: string): string {
    var result = ''
    var str = document.cookie
    var cookies = str ? str.split('; ') : []
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=')
      var name = parts.shift()
      var cookie = parts.join('=')

      if (key && key === name) {
        result = cookie
        break
      }
    }
    return result
  }

  static setCookie(name: string, value: string, days?: number): void {
    if (typeof days === "undefined") days = 7
    var date: Date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    var expires = "; expires=" + date.toUTCString()
    document.cookie = name + "=" + value + expires + "; path=/"
  }

  static removeCookie(name: string): void {
    Page.setCookie(name, "", -1)
  }

  static getCoEditKey(): string {
    return Page.getUrlVar('coEditKey')
  }

  static addLocale(url: string, locale: string) {
    return Page.addQuery(url, 'locale', locale)
  }

  static removeQuery(url: string, queryName: string) {
    var urlparts = url.split('?')
    if (urlparts.length >= 2) {
      var prefix = encodeURIComponent(queryName) + '='
      var pars = urlparts[1].split(/[&]/g)
      for (var i = pars.length; i-- > 0;) {
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1)
        }
      }
      url = urlparts[0] + '?' + pars.join('&')
      return url
    } else {
      return url
    }
  }

  static addTimestamp(url: string): string {
    return Page.addQuery(url, "ts", String.getUnixTimestamp())
  }

  static addQuery(url: string, queryName: string, queryValue: any): string {
    if (url.indexOf(queryName + '=') !== -1) {
        url = Page.removeQuery(url, queryName)
    }
    var value = encodeURIComponent(queryValue)
    if (url && url.indexOf('?') !== -1) {
        url += '&' + queryName + '=' + value
    } else {
        url += '?' + queryName + '=' + value
    }
    return url
  }

  static getUrlVar(key: string): string {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search)
    return result && decodeURIComponent(result[1]) || ""
  }

  static isProtocal(url: string) {
    if (!url) return false
    return (url.indexOf("://") != -1 || _.startsWith(url, "javascript:void(0)"))
  }

  static redirectToReturnUrl(defaultUrl?: string): void {
    location.href = Addr.getReturnUrl(defaultUrl)
  }

  static redirect(url: string): void {
    location.href = url
  }

  static reload(): void {
    location.reload(true)
  }

  static downloadURL(url) {
    $('<iframe>', { src: url }).hide().appendTo('body')
  }
}

export class Addr {
  static getOwnerUrl(owner: string) {
    return release.domain + "/" + owner + "/"
  }

  static getRepoUrl(owner: string, name: string) {
    return release.domain + "/" + owner + "/" + name + "/"
  }

  static getCloudUrl(url?: string) {
    return release.domain + "/" + url.replace(/(^\/*)|(\/*$)/g, "")
  }

  static getAbsoluteUrl(url?: string) {
    url = url || ''
    if (_.startsWith(url, 'http://') || _.startsWith(url, 'https://')) return url
    var domain = release.domain
    return domain + "/" + url.replace(/(^\/*)|(\/*$)/g, "")
  }

  static getUrl(url?: string): string {
    url = url || ''
    if (!Page.isProtocal(url)) {
      url = '/' + (_.trimStart(url, '/') || '')
    }
    return url
  }

  static getImgUrl(url: string): string {
    return Addr.getAbsoluteUrl('assets/img/' + url)
  }

  static getUrlCDN(relatedUrl?: string): string {
    if (relatedUrl) {
      relatedUrl = _.trim(relatedUrl, '/')
    } else {
      relatedUrl = ''
    }
    return release.domainCDN + '/' + relatedUrl
  }

  static getReturnUrl(defaultUrl?: string): string {
    var reg = new RegExp("(^|&)" + "returnUrl" + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return defaultUrl || Addr.getUrl()
    }
  }

  static getCoEditUrl(appKey: string) {
    if (Page.getUrlVar('coEditKey')) {
      return location.href
    }
    return location.href + '&coEditKey=' + appKey
  }

  static getThirdLoginUrl(bindingType: string, returnUrl: string, username?: string): string {
    if (username) {
      return '/home/authlogin.html?isStart=true&bindingType=' + bindingType + "&username=" + username + '&returnUrl=' + returnUrl
    } else {
      return '/home/authlogin.html?isStart=true&bindingType=' + bindingType + '&returnUrl=' + returnUrl
    }
  }

  static getErrorUrl(): string {
    return Addr.getUrl('error.html')
  }

  static getAvatarUrl(user: models.User): string {
    if (!user || !user.avatarUrl) return Addr.getImgUrl('avatar.png')
    return "http://avatars.assets." + release.rootDestination + "/" + user.avatarUrl
  }

  static getPath(owner: string, name: string){
    return owner + "/" + name
  }

  static getEditUrl(path: string) {
    return Addr.getUrl(path + '/edit')
  }

  static getDashboardUrl() {
    return Addr.getUrl('dashboard/')
  }

  static getLoginUrl(returnUrl?: string): string {
    returnUrl = returnUrl || window.location.href
    return Addr.getUrl('login/index.html?returnUrl=' + encodeURIComponent(returnUrl))
  }

  static getSignupUrl(returnUrl?: string): string {
    returnUrl = returnUrl || Addr.getReturnUrl()
    return Addr.getUrl('signup/index.html?returnUrl=' + encodeURIComponent(returnUrl))
  }

  static getForgetPasswordUrl(returnUrl?: string): string {
    returnUrl = returnUrl || Addr.getReturnUrl()
    return Addr.getUrl('forgetpassword/index.html?returnUrl=' + encodeURIComponent(returnUrl))
  }
}

export class Auth {
  static getToken(): string {
    var cookie = Page.getCookie(models.Const.ACCESS_TOKEN)
    return (cookie && cookie !== 'undefined' && cookie !== 'null') ? cookie : ''
  }

  static getUser(): models.User {
    var cookie = Page.getCookie(models.Const.USER)
    return Translate.base64IsValid(cookie) ? JSON.parse(Translate.base64ForUrlDecode(cookie)) : null
  }

  static getMember(): models.Member {
    var cookie = Page.getCookie(models.Const.MEMBER)
    return Translate.base64IsValid(cookie) ? JSON.parse(Translate.base64ForUrlDecode(cookie)) : null
  }

  static getOrg(): models.Org {
    var cookie = Page.getCookie(models.Const.ORG)
    return Translate.base64IsValid(cookie) ? JSON.parse(Translate.base64ForUrlDecode(cookie)) : null
  }

  static cache(accessToken: string, user: models.User, member: models.Member, org: models.Org) {
    client.setToken(accessToken)
    Ajax.setHeader(accessToken)
    Page.setCookie(models.Const.ACCESS_TOKEN, accessToken, 7)
    Page.setCookie(models.Const.USER, Translate.base64ForUrlEncode(JSON.stringify(user)), 7)
    Page.setCookie(models.Const.MEMBER, Translate.base64ForUrlEncode(JSON.stringify(member)), 7)
    Page.setCookie(models.Const.ORG, Translate.base64ForUrlEncode(JSON.stringify(org)), 7)
  }

  static removeCache() {
      Page.removeCookie(models.Const.ACCESS_TOKEN)
      Page.removeCookie(models.Const.USER)
      Page.removeCookie(models.Const.MEMBER)
      Page.removeCookie(models.Const.ORG)
      Ajax.setHeader('')
  }
}

export class Ajax {
  static setHeader(token: string) {
      var headers: { [key: string]: any } = {}
      var authorization = 'Bearer ' + token
      headers['Authorization'] = authorization

      $.ajaxSetup({
          headers: headers
      })
  }

  private static handleError(xhr, fail?: (errorMessage: string) => void) {
      var errorMessage = ''
      if (xhr && xhr.responseText) {
          try {
              var responseObject = JSON.parse(xhr.responseText)
              var message = responseObject.exceptionMessage || responseObject.errorMessage || responseObject.message
              errorMessage = message
          } catch (e) { }
      }
      if (fail) {
          fail(errorMessage)
      } else {
          DOM.loading(false)
          if (errorMessage) {
              Tips.error(errorMessage)
          }
      }
  }

  static get(url, done?: (data) => void, fail?: (errorMessage: string) => void): void {
      Ajax.ajaxJSON(models.ERestMethod.GET, null, url, done, fail)
  }

  static post(parameters, url, done?: (data) => void, fail?: (errorMessage: string) => void): void {
      Ajax.ajaxJSON(models.ERestMethod.POST, parameters, url, done, fail)
  }

  static put(parameters, url, done?: (data) => void, fail?: () => void): void {
      Ajax.ajaxJSON(models.ERestMethod.PUT, parameters, url, done, fail)
  }

  static delete(url, done?: (data) => void, fail?: () => void): void {
      Ajax.ajaxJSON(models.ERestMethod.DELETE, null, url, done, fail)
  }

  static ajaxGet(parameters, url, done?: (data) => void, fail?: () => void): void {
      Ajax.ajax("GET", parameters, url, done, fail)
  }

  static ajaxPost(parameters, url, done?: (data) => void, fail?: () => void): void {
      Ajax.ajax("POST", parameters, url, done, fail)
  }

  static ajaxPut(parameters, url, done?: (data) => void, fail?: () => void): void {
      Ajax.ajax("PUT", parameters, url, done, fail)
  }

  static ajaxDelete(parameters, url, done?: (data) => void, fail?: () => void): void {
      Ajax.ajax("DELETE", parameters, url, done, fail)
  }

  private static ajax(method: string, parameters, url, done?: (data) => void, fail?: (errorMessage: string) => void): void {
      if (done) {
          $.ajax({
              url: url,
              type: method,
              data: parameters,
              dataType: 'json'
          })
              .done((data) => {
              done(data)
          })
              .fail((xhr) => {
              Ajax.handleError(xhr, fail)
          })
      } else {
          $.ajax({
              url: url,
              type: method,
              data: parameters,
              dataType: 'json'
          })
              .fail((xhr) => {
              Ajax.handleError(xhr, fail)
          })
      }
  }

  private static ajaxJSON(method: models.ERestMethod, parameters: Object, url, done?: (data) => void, fail?: (errorMessage: string) => void): void {
      var data = (method === models.ERestMethod.GET || typeof parameters == "string") ? parameters : JSON.stringify(parameters || {})
      if (done) {
          $.ajax({
              url: url,
              type: models.ERestMethodUtils.getValue(method),
              data: data,
              contentType: "application/json charset=utf-8",
              dataType: 'json'
          })
              .done((data) => {
              done(data)
          })
              .fail((xhr) => {
              Ajax.handleError(xhr, fail)
          })
      } else {
          $.ajax({
              url: url,
              type: models.ERestMethodUtils.getValue(method),
              data: data,
              contentType: "application/json charset=utf-8",
              dataType: 'json'
          })
              .fail((xhr) => {
              Ajax.handleError(xhr, fail)
          })
      }
  }

  static SCRIPT_URL_UEDITOR_1: string = "/lib/ueditor/1.4.3/ueditor.config.js"
  static SCRIPT_URL_UEDITOR_2: string = "/lib/ueditor/1.4.3/ueditor.all.min.js"
  static SCRIPT_URL_UEDITOR_3: string = "/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js"

  static SCRIPT_URL_STRIPE: string = 'https://checkout.stripe.com/checkout.js'

  static loadLibResources(){
    Ajax.loadScript("/lib/wysihtml/0.5.4/dist/wysihtml-toolbar.min.js", () => {
        Ajax.loadScript("/lib/wysihtml/0.5.4/parser_rules/advanced_and_extended.js")
    })
    Ajax.loadScript("/lib/ace/src-noconflict/ace.js")
  }

  private static scriptUrlList = {}

  static loadScript(url: any, success?: () => void) {
    url = Addr.getAbsoluteUrl(url)
    if (Ajax.scriptUrlList[url]) {
      success && success()
    } else {
      scriptjs(url, function () {
        success && success()
        Ajax.scriptUrlList[url] = true
      })
    }
  }
}

export class Cache {
  static Mouse_pageX: number
  static Mouse_pageY: number
  static StartupSelect_onSelect: Function
}

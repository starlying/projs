import * as _ from 'lodash'
import * as models from '../../api/models'
import client from '../../lib/client'
import * as lang from '../../lib/lang'
import * as utils from '../../lib/utils'
import * as data from './data'

export default class appUtils {
  private static appList: Array<models.App> = null

  static isLoadApps(): boolean {
    return appUtils.appList !== null
  }

  static loadAppsIfNotExists(success: Function): void {
    if (!appUtils.isLoadApps()) {
      client.apps.list((err, res) => {
        appUtils.appList = <Array<models.App>>res
        success()
      })
    } else {
      success()
    }
  }

  static getApps(): Array<models.App> {
    return appUtils.appList
  }

  static getApp(id: string): models.App {
    var retval: models.App = null

    if (appUtils.appList) {
      appUtils.appList.forEach((app: models.App) => {
        if (app.id === id) {
          retval = app
        }
      })
    }

    return retval
  }

  static delete(owner: string, name: string, success: Function) {
    // utils.DOM.loading(true)
    // client.apps.delete(owner, name, (err, res) => {
    //   utils.DOM.loading(false)
    //   if (!err) {
    //     _.remove(appUtils.appList, (app: models.App) => {
    //       return app.id === id
    //     })
    //     success()
    //   } else {
    //     utils.Swal.error(err.message)
    //   }
    // })
  }

  static create(name: string, _private: boolean, category: string, templateId: string) {
    //utils.DOM.loading(true)
    ////var title = generate({ number: true }).dashed
    //client.apps.create(name, models.EAppTypeUtils.getValue(type), _private, lang.locale(), category, templateId, (err, res) => {
    //    if (err) {
    //        if (!err) {
    //            var app: models.App = <models.App>res
    //            utils.Page.redirect(utils.Page.getEditUrl(app.id))
    //        } else {
    //            utils.Swal.error(err.message)
    //        }
    //    } else {
    //        utils.DOM.loading(false)
    //        var app: models.App = <models.App>res
    //        utils.Page.redirect(utils.Page.getEditUrl(app.id))
    //    }
    //})
  }
}

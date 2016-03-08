import * as http from '../http'
import * as models from '../models'
import Files from './apps_files'
import Folders from './apps_folders'

export default class Apps {
  private request: http.APIRequest
  public files: Files
  public folders: Folders

  constructor(request: http.APIRequest) {
    this.request = request
    this.files = new Files(this.request)
    this.folders = new Folders(this.request)
  }

  add(dirPath: string, origin: string, check: boolean, cb?: (err: models.Error, res: {
    config: boolean,
    app: models.App
  }) => void) {
    this.request.post('/apps', {
      dirPath: dirPath,
      origin: origin,
      check: check,
    }, cb)
  }

  create(name: string, description: string, tags: string, origin: string, _private: boolean, cb?: (err: models.Error, app: models.App) => void) {
    this.request.post('/apps', {
      name: name,
      description: description,
      tags: tags,
      origin: origin,
      private: _private
    }, cb)
  }

  delete(appPath: string, keepFiles: boolean, cb?: (err: models.Error, app: models.App) => void) {
    this.request.delete('/apps/' + appPath, {
      keepFiles: keepFiles
    }, cb)
  }

  edit(appPath: string, data: Object, cb?: (err: models.Error, app: models.App) => void) {
    this.request.patch('/apps/' + appPath, data, cb)
  }

  get(appPath: string, cb?: (err: models.Error, app: models.App) => void) {
    this.request.get('/apps/' + appPath, null, cb)
  }

  list(cb?: (err: models.Error, appList: Array<models.App>) => void) {
    this.request.get('/apps', null, cb)
  }

  load(appPath: string, lastModified: string, cb: (err: models.Error, res: {
    lastModified: string,
    app: models.App,
    config: models.Config,
    sites: Array<models.Site>,
  }, status: number) => void) {
    this.request.post('/apps/' + appPath + '/actions/load', {
      lastModified: lastModified
    }, cb)
  }

  publish(appPath: string, cb?: (err: models.Error, app: models.App) => void) {
    this.request.post('/apps/' + appPath + '/actions/publish', null, cb)
  }

  save(appPath: string, payloads: Array<models.SavePayload>, cb?: (err: models.Error, res: { lastModified: string }) => void) {
    this.request.post('/apps/' + appPath + '/actions/save', {
      payloads: payloads
    }, cb)
  }

  star(appPath: string, star: boolean, cb?: (err: models.Error, res: { starCount: number }) => void) {
    this.request.post('/apps/' + appPath + '/actions/star', {
      star: star
    }, cb)
  }

  sync(appPath: string, cb?: (err: models.Error, res: { log: string }) => void) {
    this.request.post('/apps/' + appPath + '/actions/sync', null, cb)
  }
}

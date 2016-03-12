import * as http from '../http'
import * as models from '../models'

export default class Orgs {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(org: models.Org, cb?: (err: models.Error, res: models.Org) => void) {
    this.request.post('/orgs', org, cb)
  }

  delete(password: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/orgs', {
      password: password
    }, cb)
  }

  edit(org: models.Org, cb?: (err: models.Error, res: models.Org) => void) {
    this.request.put('/orgs/' + org.id, org, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Org) => void) {
    this.request.get('/orgs/' + id, null, cb)
  }

  list(parentID: number, cb?: (err: models.Error, res: {
    orgs: Array<models.Org>
  }) => void) {
    this.request.get('/orgs', {
      parentID: parentID,
    }, cb)
  }

  search(idCardNumber: string, cb?: (err: models.Error, res: {
    users: Array<models.User>
    parties: Array<string>
  }) => void) {
    this.request.post('/orgs/actions/search', {
      idCardNumber: idCardNumber,
    }, cb)
  }
}

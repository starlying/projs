import * as http from '../http'
import * as models from '../models'

export default class Members {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(member: models.Member, cb?: (err: models.Error, res: models.Member) => void) {
    this.request.post('/members', member, cb)
  }

  delete(password: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/members', {
      password: password
    }, cb)
  }

  edit(member: models.Member, cb?: (err: models.Error, res: models.User) => void) {
    this.request.put('/members/' + member.id, member, cb)
  }

  get(id: string, cb?: (err: models.Error, res: models.Member) => void) {
    this.request.get('/members/' + id, null, cb)
  }

  list(orgID: number, cb?: (err: models.Error, res: {
    members: Array<models.Member>
  }) => void) {
    this.request.get('/members', {
      orgID: orgID,
    }, cb)
  }

  search(idCardNumber: string, cb?: (err: models.Error, res: {
    users: Array<models.User>
    parties: Array<string>
  }) => void) {
    this.request.post('/members/actions/search', {
      idCardNumber: idCardNumber,
    }, cb)
  }
}

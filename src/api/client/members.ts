import * as http from '../http'
import * as models from '../models'

export default class Members {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  delete(password: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/members', {
      password: password
    }, cb)
  }

  edit(data: Object, cb?: (err: models.Error, res: models.User) => void) {
    this.request.patch('/members', data, cb)
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

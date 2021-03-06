import * as http from '../http'
import * as models from '../models'

export default class Users {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  get(cb?: (err: models.Error, res: models.User) => void) {
    this.request.get('/user', null, cb)
  }

  delete(password: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/users', {
      password: password
    }, cb)
  }

  edit(userName: string, data: Object, cb?: (err: models.Error, res: models.User) => void) {
    this.request.put('/users/' + userName, data, cb)
  }

  login(username: string, password: string, cb?: (err: models.Error, res: {
    token: string
    user: models.User
    member: models.Member
    org: models.Org
  }) => void) {
    this.request.post('/users/actions/login', {
      username: username,
      password: password
    }, cb)
  }

  search(idCardNumber: string, cb?: (err: models.Error, res: {
    users: Array<models.User>
    members: Array<models.Member>
  }) => void) {
    this.request.post('/users/actions/search', {
      idCardNumber: idCardNumber,
    }, cb)
  }

  logout(cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/users/actions/logout', null, cb)
  }

  passwordForgot(email: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/users/actions/password_forgot', {
      email: email
    }, cb)
  }

  passwordReset(currentPassword: string, newPassword: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/users/actions/password_reset', {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, cb)
  }

  signup(username: string, email: string, password: string, cb?: (err: models.Error, res: {
    user: models.User
    accessToken: string
  }) => void) {
    this.request.post('/users', {
      username: username,
      email: email,
      password: password
    }, cb)
  }

  getUploadAvatarUrl(username: string): string {
    return this.request.getURL('/users/actions/upload_avatar/' + username)
  }
}

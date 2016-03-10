// https://github.com/michael/github

import * as models from './models'
import * as http from './http'
import User from './client/user'
import Users from './client/users'
import Members from './client/members'

export class API {
  request: http.WebRequest
  user: User
  users: Users
  members: Members

  constructor(public options: models.Options) {
    this.request = new http.WebRequest()

    var apiRequest = new http.APIRequest(options)
    this.user = new User(apiRequest)
    this.users = new Users(apiRequest)
    this.members = new Members(apiRequest)
  }
}

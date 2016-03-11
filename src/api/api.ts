// https://github.com/michael/github

import * as models from './models'
import * as http from './http'
import Users from './client/users'
import Members from './client/members'

export class API {
  request: http.WebRequest
  users: Users
  members: Members

  constructor(public options: models.Options) {
    this.request = new http.WebRequest()

    var apiRequest = new http.APIRequest(options)
    this.users = new Users(apiRequest)
    this.members = new Members(apiRequest)
  }
}

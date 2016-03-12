import * as types from '../constants/actionTypes';
import * as models from "../api/models"
import client from "../lib/client"
import * as utils from "../lib/utils"

export function login(token: string, user: models.User, member: models.Member) {
  utils.Auth.cache(token, user, member)
  return { type: types.AUTH_LOGIN, token, user, member };
}

export function logout() {
  utils.Auth.removeCache()
  return { type: types.AUTH_LOGOUT };
}

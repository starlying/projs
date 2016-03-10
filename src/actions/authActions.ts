import * as types from '../constants/actionTypes';
import * as models from "../api/models"
import client from "../lib/client"
import * as utils from "../lib/utils"

export function login(token: string, user: models.User) {
  utils.Auth.cache(token, user)
  return { type: types.AUTH_LOGIN, token, user };
}

export function logout() {
  utils.Auth.removeCache()
  return { type: types.AUTH_LOGOUT };
}

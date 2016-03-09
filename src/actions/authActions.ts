import * as types from '../constants/actionTypes';
import * as models from "../api/models"
import client from "../lib/client"
import * as utils from "../lib/utils"

export function login(user: models.User) {
  return { type: types.AUTH_LOGIN, user };
}

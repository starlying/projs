import * as React from 'react'
import * as models from "../../api/models"
import client from "../../lib/client"
import * as utils from "../../lib/utils"
import * as lang from "../../lib/lang"
import * as types from "./types"

const LOGIN = 'form/LOGIN'

export default function reducer(state: types.FormState = {}, action: types.ReduxAction): types.FormState {
  switch (action.type) {
    case LOGIN:
      return action.value
    default:
      return state
  }
}

export function login(account: string, password: string) {
  return dispatch => {
    utils.DOM.loading(true)
    var api = client.users

    api.login(account, password, (err, res) => {
      utils.DOM.loading(false)
      if (err) {
        var action: types.ReduxAction = {
          type: LOGIN,
          value: {
            account: account,
            password: password,
            alert: new models.Alert(models.EAlertType.DANGER, lang.get('There was a problem with your login.'))
          }
        }
        dispatch(action)
      } else {
        utils.Auth.login(res.accessToken)
        utils.Auth.cacheUser(res.user)
        utils.Page.redirect(utils.Addr.getReturnUrl())
      }
    })
  }
}

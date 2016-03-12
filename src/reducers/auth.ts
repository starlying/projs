import * as _ from 'lodash';
import * as types from '../constants/actionTypes';
import * as states from '../constants/states';
import * as utils from '../lib/utils';

const token = utils.Auth.getToken();
const user = utils.Auth.getUser();
const member = utils.Auth.getMember();
const isAnonymous = (token && user && user.id) ? false : true;

const initialState: states.AuthState = {
  token: token,
  user: user,
  member: member,
  isAnonymous: isAnonymous
};

export default function authAppState(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_LOGIN:
			return _.assign({}, state, {
        token : action.token,
        user : action.user,
        member : action.member,
        isAnonymous : (action.token && action.user && action.user.id) ? false : true
      });

    case types.AUTH_LOGOUT:
			return _.assign({}, state, {
        token : "",
        user : null,
        member : null,
        isAnonymous : true
      });

		default:
			return state;
	}
}

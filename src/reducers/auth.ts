import * as _ from 'lodash';
import * as types from '../constants/actionTypes';
import * as utils from '../lib/utils';

const initialState = {
  isAnonymous: utils.Auth.isAnonymous(),
  user: utils.Auth.getUser()
};

export default function authAppState(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_LOGIN:
			return _.assign({}, state, {
        isAnonymous : action.user ? false : true,
        user : action.user,
      });

		default:
			return state;
	}
}

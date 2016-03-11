import * as models from '../api/models';

export interface AllState {
  authState: AuthState
}

export interface AuthState {
  token: string
  user: models.User
  isAnonymous: boolean
}

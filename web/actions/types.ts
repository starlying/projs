import * as models from "../../api/models"

export interface FormState {
  account?: string
  password?: string
  alert?: models.Alert
}

export interface ReduxState {
  counter: number
  form: FormState
}

export interface ReduxAction {
  type: string
  value?: any
}

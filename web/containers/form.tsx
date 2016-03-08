import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as models from "../../api/models"
import * as lang from '../../lib/lang'
import * as utils from '../../lib/utils'
import {Alert, Input} from '../../lib/components'
import * as data from '../logic/data'
import * as types from '../actions/types'
import {login} from '../actions/form'

interface P {
  account?: string
  password?: string
  alert?: models.Alert
  login?: (account: string, password: string) => void
}

function mapStateToProps(state: types.ReduxState) {
  return {
    account: state.form.account,
    password: state.form.password,
    alert: state.form.alert
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

class Form extends React.Component<P, {}> {
  componentDidMount() {
    var accountNode: any = ReactDOM.findDOMNode(this.refs["account"])
    accountNode.focus()
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const account = utils.DOM.getValue(this.refs["account"])
    const password = utils.DOM.getValue(this.refs["password"])
    if (account && password) {
      this.props.login(account, password)
    }
  }

  onForgetPassword(e: React.MouseEvent) {
    utils.DOM.stop(e)
    utils.Page.redirect(utils.Addr.getForgetPasswordUrl())
  }

  onSignup(e: React.MouseEvent) {
    utils.DOM.stop(e)
    utils.Page.redirect(utils.Addr.getSignupUrl())
  }

  render() {
    var alertEl = null
    if (this.props.alert) {
      alertEl = <Alert alert={this.props.alert} />
    }
    var accountEl = <Input ref="account" value={this.props.account} placeholder={lang.get('Username or Email') } className='email' required={true} />
    var passwordEl = <Input ref='password' placeholder={lang.get('Password') } className='password' required={true} />

    return (
      <div className='console-auth'>
        <div className='input-box'>
          <form className='container' ref='form' onSubmit={this.onSubmit.bind(this) }>
            <a className='logo ct-center-block' href='/'>
              <img src={utils.Addr.getImgUrl('logo-grey.png') } />
            </a>
            {alertEl}
            <label className='login-input'>
              {accountEl}
              {passwordEl}
            </label>
            <button className='ct-btn --block ct-bg-green' onClick={this.onSubmit.bind(this) }>{lang.get('Log In') }</button>
            <div className='login-back ct-mt-lg ct-mlr-sm'>
              <a className='ct-fl grey' href='javascript:void(0)' onClick={this.onForgetPassword.bind(this) }>{lang.get('Forgot password?') }</a>
              <a className='ct-fr red' href='javascript:void(0)' onClick={this.onSignup.bind(this) }>{lang.get('No account? Sign up') }</a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

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

class Top extends React.Component<P, {}> {
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
      <div className="topBg">
       <div className="wrapper">
          <span className="fl">
            你好，<a href="#" className="cor_yellow">杜丽梅</a>，欢迎来到中国移动网上党校！</span>
          <a href="/login" className="topOut">退出登录</a>
          <a href="#" className="top_btn">进入宣传门户</a>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Top)

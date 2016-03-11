import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as states from '../constants/states';
import * as models from "../api/models"
import * as utils from '../lib/utils'
import {Alert, Input} from '../lib/components'
import * as types from '../constants/actionTypes';
import * as actions from '../actions/authActions';

interface P {
  actions?: any,
  authState?: any
}

class Header extends React.Component<P, {}> {
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
    // if (this.props.alert) {
    //   alertEl = <Alert alert={this.props.alert} />
    // }
    var accountEl = <Input ref="account" value={this.props.authState.account} className='email' required={true} />
    var passwordEl = <Input ref='password' className='password' required={true} />

    return (
      <div className="header">
        <a className="logo" href="#"><img src="/assets/images/logo.jpg" width="351" height="49" /></a>
        <div className="headSel">
         <div className="headNm">中共中国移动通信集团河北有限公司党组  党组书记</div>
         <div className="headOption hidden">
          <ul>
           <li><a href="javascript:;">中共中国移动通信集团河北有限公司党组111</a></li>
           <li><a href="javascript:;">中共中国移动通信集团河北有限公司党组222</a></li>
           <li><a href="javascript:;">中共中国移动通信集团河北有限公司党组333</a></li>
          </ul>
         </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

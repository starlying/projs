import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as models from "../api/models"
import * as utils from '../lib/utils'
import {Alert, Input} from '../lib/components'
import * as types from '../constants/actionTypes';
import * as actions from '../actions/authActions';

interface P {
  actions?: any,
  appState?: any
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
    if (this.props.appState.isAnonymous) {
      browserHistory.push('/login')
    }
    return (
      <div className="topBg">
       <div className="wrapper">
          <span className="fl">你好，<a href="#" className="cor_yellow">杜丽梅</a>，欢迎来到中国移动网上党校！</span>
          <a href="/login" className="topOut">退出登录</a>
          <a href="#" className="top_btn">进入宣传门户</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    appState: state.authAppState
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
)(Top);

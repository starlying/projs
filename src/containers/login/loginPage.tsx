import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {Loading} from '../../lib/components'
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import client from '../../lib/client';
import * as types from '../../constants/actionTypes';
import * as actions from '../../actions/authActions';

interface P {
  actions?: any,
  appState?: any
}

class LoginPage extends React.Component<P, {}> {
  componentDidMount() {
    var userNameNode: any = ReactDOM.findDOMNode(this.refs["userName"])
    userNameNode.focus()
  }

  componentWillReceiveProps(props) {
    if (!props.appState.isAnonymous) {
      const path = `/`
      browserHistory.push(path)
    }
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const userName = this.refs["userName"]["value"]
    const password = this.refs["password"]["value"]
    if (userName && password) {
      // const user = new models.User()
      // user.username = userName
      // this.props.actions.login(user)


      utils.DOM.loading(true)
      client.users.login(userName, password, (err, res) => {
        utils.DOM.loading(false)
        if (!err) {
          this.props.actions.login(res.token, res.user)
          const path = `/`
          browserHistory.push(path)
        } else {
          utils.Swal.error({
            status: 404,
            message: "登录失败，用户名或者密码不正确"
          })
        }
      })
    }
  }

  // <li>
  //   <input placeholder="验证码" className="lg_int1 lg_int2 lg_int1c" name="" type="text" />
  //   <img className="lgIcon" src="/assets/images/lg_icon3.jpg" width="30" height="22" />
  //   <a className="lg_vcoder" href="#">
  //     <img src="/assets/images/vcoder.jpg" width="100" height="32" />
  //   </a>
  // </li>

  render() {
    return (
      <div className="lgBox">
        <div className="lg_hd">
          <ul>
            <li className="lg_itm lg_itm1">账号密码登录</li>
            <li className="lg_itm lg_itm2">动态口令登录</li>
            <li className="lg_itm lg_itm3">二维码登录</li>
          </ul>
        </div>
        <div className="lg_bd">
          <form className='container' ref='form' onSubmit={this.onSubmit.bind(this) }>
            <ul>
              <li>
                <input ref="userName" placeholder="请输入用户名" className="lg_int1 lg_int1a" type="text" />
                <img className="lgIcon" src="/assets/images/lg_icon1.jpg" width="30" height="22" />
              </li>
              <li>
                <input ref="password" className="lg_int1 lg_int1b" name="" type="password" />
                <img className="lgIcon" src="/assets/images/lg_icon2.jpg" width="30" height="22" />
              </li>
            </ul>
            <a href="javascript:;" className="lg_btn" onClick={this.onSubmit.bind(this) }>登录</a>
          </form>
        </div>
        <div className="lg_bd hidden">
          <ul>
            <li><input placeholder="请输入用户名" className="lg_int1 lg_int1a" name="" type="text" /><img className="lgIcon" src="/assets/images/lg_icon1.jpg" width="30" height="22" /></li>
            <li><input placeholder="动态口令" className="lg_int1 lg_int2 lg_int1d" name="" type="text" /><img className="lgIcon" src="/assets/images/lg_icon4.jpg" width="30" height="22" /><a href="#" className="lg_get">获取动图口令</a></li>
            <li><input placeholder="验证码" className="lg_int1 lg_int2 lg_int1c" name="" type="text" /><img className="lgIcon" src="/assets/images/lg_icon3.jpg" width="30" height="22" /><a className="lg_vcoder" href="#"><img src="/assets/images/vcoder.jpg" width="100" height="32" /></a></li>
          </ul>
          <a href="/" className="lg_btn">登录</a>
        </div>
        <div className="lg_bd hidden">
          <div className="lg_wx">
            <img src="/assets/images/lg_wx.jpg" width="134" height="134" /><br />请使用手机扫描二维码登陆</div>
        </div>
        <Loading />
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
)(LoginPage);

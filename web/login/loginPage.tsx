import * as React from 'react'

export default class LoginPage extends React.Component<{}, {}> {
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
          <ul>
            <li><input placeholder="请输入用户名" className="lg_int1 lg_int1a" name="" type="text" /><img className="lgIcon" src="/assets/images/lg_icon1.jpg" width="30" height="22" /></li>
            <li><input className="lg_int1 lg_int1b" name="" type="password" /><img className="lgIcon" src="/assets/images/lg_icon2.jpg" width="30" height="22" /></li>
            <li><input placeholder="验证码" className="lg_int1 lg_int2 lg_int1c" name="" type="text" /><img className="lgIcon" src="/assets/images/lg_icon3.jpg" width="30" height="22" /><a className="lg_vcoder" href="#"><img src="/assets/images/vcoder.jpg" width="100" height="32" /></a></li>
          </ul>
          <a href="/" className="lg_btn">登录</a>
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
      </div>
    )
  }
}

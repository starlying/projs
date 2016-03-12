import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';

interface P {
  user: models.User
  member: models.Member
}

interface S {
  member: models.Member
}

export default class Form extends React.Component<P, S> {
  constructor(props) {
    super(props)
    const member = this.props.member ? this.props.member : _.assign(new models.Member(), this.props.user)
    this.state = {
      member: member
    }
  }

  componentWillReceiveProps(nextProps: P) {
    const member = nextProps.member ? nextProps.member : _.assign(new models.Member(), nextProps.user)
    this.setState({
      member: member
    })
  }

  onChange(name: string, e) {
    const member = this.state.member
    member[name] = e.target.value
    this.setState({member: member});
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const userName = this.refs["userName"]["value"]
    const idCardNumber = this.refs["idCardNumber"]["value"]
    if (userName) {
      const member = this.state.member
      member.userName = userName
      member.idCardNumber = idCardNumber

      utils.DOM.loading(true)
      if (this.props.member) {
        client.members.edit(member, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push("/members/")
          } else {
            utils.Swal.error(err)
          }
        })
      } else {
        client.members.create(member, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push("/members/")
          } else {
            utils.Swal.error(err)
          }
        })
      }
    }
  }

  render() {
    const member = this.state.member

    return (
      <div className="m2con2">
        <div className="m2c2_t">基础资料表单</div>
        <div className="m2upLaod">
          <div className="m2pImg"><img src="/assets/images/headImg.jpg" width="120" height="120" /></div>
          <div className="m2pTxt">
            <a href="#" className="m2Btn"></a>
            支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传
          </div>
        </div>
        <div className="m2fm">
          <ul>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 登录名：</span>
              <input ref="userName" value={member.userName} onChange={this.onChange.bind(this, 'userName')} className="m2fm_int" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 密  码：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 姓  名：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 性  别：</span>
              <input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>男</dd>
                  <dd>女</dd>
                </dl>
              </div></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 身份证号：</span>
              <input ref="idCardNumber" value={member.idCardNumber} onChange={this.onChange.bind(this, 'idCardNumber')} className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 出生年月：</span>
              <input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 民  族：</span>
              <input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>汉</dd>
                  <dd>维吾尔</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"> 职  务：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 学  历：</span>
              <input placeholder="大专" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>大专</dd>
                  <dd>本科</dd>
                </dl>
              </div></li>
            <li>
              <span className="m2fm_s1"> 学  位：</span>
              <input placeholder="博士" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>博士</dd>
                  <dd>博士</dd>
                </dl>
              </div></li>
            <li>
              <span className="m2fm_s1"> 联系电话：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"> 手机号码：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"> 邮  箱：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"> 申请入党日期：</span>
              <input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
          </ul>
          <div className="clear"></div>
        </div>
        <div className="m2fm m2fm2">
          <ul>
            <li>
              <span className="m2fm_s1"> 籍  贯：</span>
              <input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>汉</dd>
                  <dd>维吾尔</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 工作岗位：：</span>
              <input placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox">
                <dl>
                  <dd>汉</dd>
                  <dd>维吾尔</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1">参加工作日期：</span>
              <input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1">专业技术职务：</span>
              <input className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1">工作岗位开始日期：</span>
              <input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
          </ul>
          <div className="clear"></div>
        </div>
        <div className="m2fmSubmitBox">
        <input onClick={this.onSubmit.bind(this)} className="m2fmSubmit" name="" type="reset" value="" />
        </div>
      </div>
    )
  }
}

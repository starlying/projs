import * as React from 'react'
import * as _ from 'lodash'
import * as Upload from 'rc-upload'
import * as RCCalendar from 'rc-calendar'
const LOCALE = require('rc-calendar/lib/locale/zh_CN')
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  user: models.User
  member: models.Member
}

interface S {
  user: models.User
  member: models.Member
  isEdit: boolean
  isSex: boolean
  isApplyCalendar: boolean
}

export default class Form extends React.Component<P, S> {
  constructor(props) {
    super(props)
    const member = this.props.member ? this.props.member : _.assign(new models.Member(), this.props.user)
    const isEdit = this.props.member ? true : false
    this.state = {
      user: this.props.user,
      member: member,
      isEdit: isEdit,
      isSex: false,
      isApplyCalendar: false
    }
  }

  componentWillReceiveProps(nextProps: P) {
    const member = nextProps.member ? nextProps.member : _.assign(new models.Member(), nextProps.user)
    const isEdit = nextProps.member ? true : false
    this.setState({
      user: nextProps.user,
      member: member,
      isEdit: isEdit,
      isSex: false,
      isApplyCalendar: false
    })
  }

  onChange(name: string, e) {
    const user = this.state.user
    const member = this.state.member
    if (user) {
      user[name] = e.target.value
    }
    member[name] = e.target.value
    this.setState({
      user: user,
      member: member,
      isEdit: this.state.isEdit,
      isSex: false,
      isApplyCalendar: false,
    });
  }

  onValueChange(name: string, value: string, e){
    const user = this.state.user
    const member = this.state.member
    if (user) {
      user[name] = value
    }
    member[name] = value
    this.setState({
      user: user,
      member: member,
      isEdit: this.state.isEdit,
      isSex: false,
      isApplyCalendar: false,
    });
  }

  onCalendarSelect(name: string, value, e) {
    const user = this.state.user
    const member = this.state.member
    if (user) {
      user[name] = utils.Translate.toMomentByDate(new Date(value.time)).format("YYYY-MM-DD")
    }
    member[name] = utils.Translate.toMomentByDate(new Date(value.time)).format("YYYY-MM-DD")
    this.setState({
      user: user,
      member: member,
      isEdit: this.state.isEdit,
      isSex: false,
      isApplyCalendar: false,
    });
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const user = this.state.user
    const member = this.state.member

    if (member.userName) {
      utils.DOM.loading(true)

      client.users.edit(user, (err, res) => {
        if (!err) {
          if (this.state.isEdit) {
            client.members.edit(member, (err, res) => {
              utils.DOM.loading(false)
              if (!err) {
                browserHistory.push(links.MEMBERS)
              } else {
                utils.Swal.error(err)
              }
            })
          } else {
            client.members.create(member, (err, res) => {
              utils.DOM.loading(false)
              if (!err) {
                browserHistory.push(links.MEMBERS)
              } else {
                utils.Swal.error(err)
              }
            })
          }
        } else {
          utils.DOM.loading(false)
          utils.Swal.error(err)
        }
      })
    }
  }

  onSexClick(e) {
    this.setState({
      user: this.state.user,
      member: this.state.member,
      isEdit: this.state.isEdit,
      isSex: !this.state.isSex,
      isApplyCalendar: this.state.isApplyCalendar,
    })
  }

  onApplyCalendarClick(e) {
    this.setState({
      user: this.state.user,
      member: this.state.member,
      isEdit: this.state.isEdit,
      isSex: this.state.isSex,
      isApplyCalendar: !this.state.isApplyCalendar,
    })
  }

  render() {
    const user = this.state.user
    const member = this.state.member

    let applyCalendarEl = null
    if (this.state.isApplyCalendar) {
      applyCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'applyPartyDate')} />
    }

    const props = utils.UploadProps.getAvatarProps(user.userName, (result: {avatarUrl: string}) => {
      const user = this.state.user
      user.avatarUrl = result.avatarUrl
      this.setState({
        user: user,
        member: this.state.member,
        isEdit: this.state.isEdit,
        isSex: false,
        isApplyCalendar: false,
      });
    }, (message: string) => {
      utils.Swal.error({
        status: 0,
        message: message
      })
    })

    const avatarUrl = user.avatarUrl || "/assets/images/headImg.jpg"

    return (
      <div className="m2con2">
        <div className="m2c2_t">基础资料表单</div>
        <div className="m2upLaod">
          <div className="m2pImg"><img src={avatarUrl} width="120" height="120" /></div>
          <div className="m2pTxt">
            <Upload {...props}><a href='javascript:void(0)' className="m2Btn"></a></Upload>
            支持为jpg、精品个、gif、png格式，大小在2M以内的图片上传
          </div>
        </div>
        <div className="m2fm">
          <ul>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 登录名：</span>
              <input value={user.userName} onChange={this.onChange.bind(this, 'userName')} className="m2fm_int" type="text" />
            </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 密  码：</span>
              <input onChange={this.onChange.bind(this, 'password')} className="m2fm_int" name="" type="password" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 姓  名：</span>
              <input value={user.displayName} onChange={this.onChange.bind(this, 'displayName')} className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 性  别：</span>
              <input onClick={this.onSexClick.bind(this)} value={user.sex} placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{display: this.state.isSex ? "block" : "none"}}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "sex", "男")}>男</dd>
                  <dd onClick={this.onValueChange.bind(this, "sex", "女")}>女</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 身份证号：</span>
              <input ref="idCardNumber" className="m2fm_int" name="" type="text" /></li>
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
              <input value={utils.Translate.toShortDate(member.applyPartyDate.toString())} onClick={this.onApplyCalendarClick.bind(this)} onChange={this.onChange.bind(this, "applyPartyDate")} className="m2fm_int m2fm_int2" name="" type="text" />
              {applyCalendarEl}
            </li>
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

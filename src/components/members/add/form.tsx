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
  isNationality: boolean
  isEducation: boolean
  isDegree: boolean
  isNativePlace: boolean
  isWorkingHours: boolean
  isBirthDay: boolean
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
      isApplyCalendar: false,
      isNationality: false,
      isEducation: false,
      isDegree: false,
      isNativePlace: false,
      isWorkingHours:false,
      isBirthDay: false
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
      isApplyCalendar: false,
      isNationality: false,
      isEducation: false,
      isDegree: false,
      isNativePlace: false,
      isWorkingHours:false,
      isBirthDay: false
    })
  }

  onChange(name: string, e) {
    const user = this.state.user
    const member = this.state.member
    if (user) {
      user[name] = e.target.value
    }
    member[name] = e.target.value
    this.state.user = user;
    this.state.member = member;
    this.reset()
    this.setState(this.state);
  }

  reset() {
    this.state.isSex = false
    this.state.isEducation = false
    this.state.isNationality = false
    this.state.isApplyCalendar = false
    this.state.isDegree = false
    this.state.isNativePlace = false
    this.state.isWorkingHours = false
    this.state.isBirthDay = false
  }

  onValueChange(name: string, value: string, e){
    const user = this.state.user
    const member = this.state.member
    if (user) {
      user[name] = value
    }
    member[name] = value
    this.state.user = user;
    this.state.member = member;
    this.reset()
    this.setState(this.state);
  }

  onCalendarSelect(name: string, value, e) {
    const user = this.state.user
    const member = this.state.member
    const date = utils.Translate.toShortDate(new Date(value.time).toString())
    if (user) {
      user[name] = date
    }
    member[name] = date
    this.state.user = user;
    this.state.member = member;
    this.reset()
    this.setState(this.state);
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const user = this.state.user
    const member = this.state.member

    if (member.userName) {
      utils.DOM.loading(true)

      client.users.edit(user.userName, user, (err, res) => {
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

  onClick(name: string, e) {
    this.state[name] = !this.state[name]
    this.setState(this.state)
  }

  render() {
    const user = this.state.user
    const member = this.state.member

    let applyCalendarEl = null
    if (this.state.isApplyCalendar) {
      applyCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'applyPartyDate')} />
    }
    let workingHoursCalendarEl = null
    if (this.state.isWorkingHours) {
      workingHoursCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'workingHours')} />
    }
    let birthDayCalendarEl = null
    if (this.state.isBirthDay) {
      birthDayCalendarEl = <RCCalendar locale={LOCALE} onSelect={this.onCalendarSelect.bind(this, 'birthDay')} />
    }
    const props = utils.UploadProps.getAvatarProps(user.userName, (res: {avatarUrl: string}) => {
      const user = this.state.user
      user.avatarUrl = res.avatarUrl
      this.state.user = user;
      this.setState(this.state)
    }, (message: string) => {
      utils.Swal.error({
        status: 0,
        message: message
      })
    })

    return (
      <div className="m2con2">
        <div className="m2c2_t">基础资料表单</div>
        <div className="m2upLaod">
          <div className="m2pImg"><img src={utils.Addr.getAvatarUrl(user.avatarUrl)} width="120" height="120" /></div>
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
              <input onClick={this.onClick.bind(this, "isSex")} value={user.sex} placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{display: this.state.isSex ? "block" : "none"}}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "sex", "男")}>男</dd>
                  <dd onClick={this.onValueChange.bind(this, "sex", "女")}>女</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 身份证号：</span>
              <input value={user.idCardNumber} onChange={this.onChange.bind(this, 'idCardNumber')}  ref="idCardNumber" className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 出生年月：</span>
              <input value={utils.Translate.toShortDate(user.birthDay.toString())} onClick={this.onClick.bind(this,"isBirthDay")} onChange={this.onChange.bind(this, "birthDate")}  placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" />
                 {birthDayCalendarEl}
              </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 民  族：</span>
              <input onClick={this.onClick.bind(this, "isNationality")} value={user.nationality}  placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{display: this.state.isNationality ? "block" : "none"}}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "nationality", "汉")}>汉</dd>
                  <dd onClick={this.onValueChange.bind(this, "nationality", "维吾尔")}>维吾尔</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"> 职  务：</span>
              <input value={user.administrativeDuties} onChange={this.onChange.bind(this, 'administrativeDuties')}  ref="administrativeDuties"  className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 学  历：</span>
              <input onClick={this.onClick.bind(this, "isEducation")} value={user.education}   placeholder="本科" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{display: this.state.isEducation ? "block" : "none"}}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "education", "大专")}>大专</dd>
                  <dd onClick={this.onValueChange.bind(this, "education", "本科")}>本科</dd>
                </dl>
              </div></li>
            <li>
              <span className="m2fm_s1"> 学  士：</span>
              <input onClick={this.onClick.bind(this, "isDegree")} value={user.degree}  placeholder="博士" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{display: this.state.isDegree ? "block" : "none"}}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "degree", "博士")}>博士</dd>
                  <dd onClick={this.onValueChange.bind(this, "degree", "硕士")}>硕士</dd>
                  <dd onClick={this.onValueChange.bind(this, "degree", "学士")}>学士</dd>
                </dl>
              </div></li>
            <li>
              <span className="m2fm_s1"> 联系电话：</span>
              <input value={user.tel} onChange={this.onChange.bind(this, 'tel')}  ref="tel"  className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"> 手机号码：</span>
              <input value={user.mobile} onChange={this.onChange.bind(this, 'mobile')}  ref="mobile" className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"> 邮  箱：</span>
              <input value={user.email} onChange={this.onChange.bind(this, 'email')}  ref="email" className="m2fm_int" name="" type="text" /></li>
            <li>
              <span className="m2fm_s1"> 申请入党日期：</span>
              <input value={utils.Translate.toShortDate(member.applyPartyDate.toString())} onClick={this.onClick.bind(this,"isApplyCalendar")} onChange={this.onChange.bind(this, "applyPartyDate")} className="m2fm_int m2fm_int2" name="" type="text" />
              {applyCalendarEl}
            </li>
          </ul>
          <div className="clear"></div>
        </div>
        <div className="m2fm m2fm2">
          <ul>
            <li>
              <span className="m2fm_s1"> 籍  贯：</span>
              <input onClick={this.onClick.bind(this, "isNativePlace")} value={user.nativePlace}   placeholder="请选择" className="m2fm_int m2fm_int3" type="text" />
              <div className="m2fm_selBox" style={{display: this.state.isNativePlace ? "block" : "none"}}>
                <dl>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "北京")}>北京</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "上海")}>上海</dd>
                  <dd onClick={this.onValueChange.bind(this, "nativePlace", "广东")}>广东</dd>
                </dl>
              </div>
            </li>
            <li>
              <span className="m2fm_s1"><strong className="cor_red">*</strong> 工作岗位：</span>
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
              <input value={utils.Translate.toShortDate(user.workingHours.toString())} onClick={this.onClick.bind(this,"isWorkingHours")} onChange={this.onChange.bind(this, "workingHours")} placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" />
              {workingHoursCalendarEl}
              </li>
            <li>
              <span className="m2fm_s1">专业技术职务：</span>
              <input value={user.technicalPositions} onChange={this.onChange.bind(this, 'technicalPositions')}  ref="technicalPositions"  className="m2fm_int" name="" type="text" /></li>
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

/*
<li>
  <span className="m2fm_s1">工作岗位开始日期：</span>
  <input placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" type="text" /></li>
*/

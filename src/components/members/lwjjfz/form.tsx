import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import * as links from '../../../constants/links';

interface P {
  member: models.Member
  onClose: Function
}

interface S {
  member: models.Member
  isList: boolean
}

export default class LWJJFZ extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      member: this.props.member,
      isList: false
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      member: nextProps.member,
      isList: false
    })
  }

  onChange(name: string, e) {
    const member = this.state.member
    member[name] = e.target.value
    this.setState({
      member: member,
      isList: false
    });
  }

  onSubmit(e: React.MouseEvent) {
    utils.DOM.prevent(e)

    const member = this.state.member
    if (member.userName) {
      utils.DOM.loading(true)
      if (this.props.member) {
        client.members.edit(member, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push(links.ORGS)
          } else {
            utils.Swal.error(err)
          }
        })
      } else {
        client.members.create(member, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push(links.ORGS)
          } else {
            utils.Swal.error(err)
          }
        })
      }
    }
  }

  onMeetingClick(e) {
    utils.DOM.prevent(e)
    this.setState({
      member: this.state.member,
      isList: !this.state.isList
    })
  }

  onMeetingChange(e) {
    utils.DOM.prevent(e)
  }

  render() {
    const member = this.state.member

    const title = '将' + member.displayName + '列为积极分子'

    let listEl = null
    if (this.state.isList) {
      listEl = (
        <div className="layer_sbbx3">
          <table className="layer_tab2" width="100%">
            <tbody>
              <tr className="layer_th2">
                <td width="8%"></td>
                <td>会议名称</td>
                <td>会议时间</td>
                <td>组织名称</td>
              </tr>
              <tr>
                <td style={{textAlign: "center"}}>
                  <input className="lay-rad" name="a" type="radio" value="" />
                </td>
                <td><a href="#" className="cor_red">XXX讨论会</a>
                </td>
                <td>2016-01-15</td>
                <td>河南党支部</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3b">
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox" style={{ paddingTop: "45px" }}>
            <ul>
              <li><span className="lay_s1" style={{ width: "117px" }}>会议名称</span>
                <div className="m2fm_selContent" style={{ position: "relative", float: "left", marginRight: "10px" }}>
                  <input onClick={this.onMeetingClick.bind(this)} onChange={this.onMeetingChange.bind(this)} value="" type="text" className="m2fm_int m2fm_int3" style={{ width: "155px" }} placeholder="请选择" />
                </div>
                <a href="javascript:;" className="m2fm_pubBtn2">新建会议纪要</a>
                {listEl}
              </li>
              <li>
                <span className="lay_s1" style={{ width: "117px" }}>成为积极分子时间</span>
                <input type="text" className="m2fm_int m2fm_int2 m2fm_int10" style={{ width: "255px" }} name="" />
              </li>
            </ul>
          </div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this) }>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this) }>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}

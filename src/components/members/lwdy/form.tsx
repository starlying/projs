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
}

export default class FPJSR extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      member: this.props.member
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      member: nextProps.member
    })
  }

  onChange(name: string, e) {
    const member = this.state.member
    member[name] = e.target.value
    this.setState({ member: member });
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

  render() {
    const member = this.state.member

    const title = '列为党员'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3a">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">{title}</div>
          <div className="m2nadBox">
            <ul>
              <li>
                <span className="lay_s1">界数</span><span className="lay_s1a">XXXXXXX 组织</span>
              </li>
              <li>
                <span className="lay_s1">上级组织代码</span><span className="lay_s1a">XXXXXXX00235</span>
              </li>
              <li>
                <span className="lay_s1">党组织编码</span><span className="lay_s1a">XXXXXXX00235</span>
              </li>
              <li>
                <span className="lay_s1">组织名称</span>
                <input ref="memberanizaName" value={member.userName} onChange={this.onChange.bind(this, "memberanizaName")} type="text" className="m2fm_int m2fm_int10" name="" />
              </li>
              <li>
                <span className="lay_s1">组织属性</span>
                <div className="m2fm_selContent">
                  <input type="text" className="m2fm_int m2fm_int3" placeholder="请选择" />
                  <div className="m2fm_selBox">
                    <dl>
                      <dd>党员</dd>
                      <dd>非党员</dd>
                    </dl>
                  </div>
                </div>
              </li>
              <li>
                <span className="lay_s1">建立日期</span>
                <input type="text" className="m2fm_int m2fm_int2 m2fm_int10" name="" />
              </li>
              <li>
                <span className="lay_s1">联系电话</span>
                <input type="text" className="m2fm_int m2fm_int10" name="" />
              </li>
              <li>
                <span className="lay_s1">通讯地址</span>
                <input type="text" className="m2fm_int m2fm_int10" name="" />
              </li>
              <li>
                <span className="lay_s1">建立日期</span>
                <input type="text" className="m2fm_int m2fm_int2 m2fm_int10" name="" />
              </li>
            </ul>
          </div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this)}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';

interface P {
  member: models.Member
  onClose: Function
}

interface S {
  member: models.Member
}

export default class Form extends React.Component<P, S> {
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
            browserHistory.push("/member")
          } else {
            utils.Swal.error(err)
          }
        })
      } else {
        client.members.create(member, (err, res) => {
          utils.DOM.loading(false)
          if (!err) {
            browserHistory.push("/member")
          } else {
            utils.Swal.error(err)
          }
        })
      }
    }
  }

  render() {
    const member = this.state.member

    const title = this.props.member ? '新建党组织' : '编辑党组织'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3">
          <i className="layerClose"></i>
          <div className="layer_t">XX组织XX年第X界换届选举</div>
          <div className="lay_sbx">
            <strong>当前组织：XXX党组织</strong>
            请关联会议：
          </div>
          <div className="lay_sbx2">
            <div className="lay_sli">
              <span className="m2fm_s1">会议名称：</span>
              <input type="text" name="" className="m2fm_int m2fm_int5" />
            </div>
            <div className="lay_sli">
              <span className="m2fm_s1">会议时间：</span>
              <input type="text" placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" />
              <span className="m2fm_ss1 m2fm_ss2">至</span>
              <input type="text" placeholder="2016-01-20" className="m2fm_int m2fm_int2" name="" />
            </div>
            <input value="" className="laySubmit" name="" type="submit" />
          </div>
          <div className="lay_btn1">
            <a className="m2fm_btn1" href="#">新增换届记录</a>
          </div>
          <div className="lay_sbx3">
            <div className="lay_tab">
              <table width="100%">
                <tbody>
                  <tr className="lay_th">
                    <td width="10%"><input className="lay-rad" name="" type="radio" value="" /></td>
                    <td width="35%">会议名称</td>
                    <td width="21%">会议时间 </td>
                    <td width="34%">组织名称</td>
                  </tr>
                  <tr>
                    <td><input className="lay-rad" name="" type="radio" value="" /></td>
                    <td><a className="cor_red" href="#">XXX讨论会</a></td>
                    <td>2016-01-15</td>
                    <td>河南党支部</td>
                  </tr>
                  <tr>
                    <td><input className="lay-rad" name="" type="radio" value="" /></td>
                    <td><a className="cor_red" href="#">XXX讨论会</a></td>
                    <td>2016-01-15</td>
                    <td>河南党支部</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="layFm">
              <ul>
                <li>
                  <span className="lay_s1">界数</span>
                  <input className="m2fm_int" name="" type="text" />
                  <span className="lay_s1">任期年限</span>
                  <input className="m2fm_int m2fm_inta" name="" type="text" />
                  <span className="lay_s1">换届时间</span>
                  <input className="m2fm_int m2fm_inta m2fm_int2" name="" type="text" />
                </li>
                <li>
                  <span className="lay_s1">选举形式</span>
                  <div className="m2fm_selContent">
                    <input type="text" placeholder="全部" className="m2fm_int m2fm_int3" />
                    <div className="m2fm_selBox">
                      <dl>
                        <dd>党员</dd>
                        <dd>非党员</dd>
                      </dl>
                    </div>
                  </div>
                  <span className="lay_s1">应到会人数</span>
                  <input className="m2fm_int m2fm_intb" name="" type="text" />
                  <span className="lay_s1">实到会人数</span>
                  <input className="m2fm_int m2fm_intb" name="" type="text" />
                </li>
                <li>
                  <span className="lay_s1">选举情况</span>
                  <textarea className="lay_area" name=""></textarea>
                  <div className="clear"></div>
                </li>
              </ul>
            </div>
            <div><a href="#" className="laySubmit2">确 定</a></div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    )
  }
}

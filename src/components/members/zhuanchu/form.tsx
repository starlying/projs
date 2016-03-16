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

export default class ZHUANCHU extends React.Component<P, S> {
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
        member.orgID = 0
        client.members.edit(member, (err, res) => {
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

    const title = '是否将' + member.displayName + '从本组织转出'
    return (
      <div>
        <div className="layerBg"></div>
        <div className="layerCon1 layerCon3 layerCon3b">
          <i className="layerClose" onClick={this.props.onClose.bind(this)}></i>
          <div className="layer_t">{title}</div>
          <div className="m2btnBox2">
            <a href="javascript:;" className="m2btn_a1" onClick={this.onSubmit.bind(this)}>确 定</a>
            <a href="javascript:;" className="m2btn_a2" onClick={this.props.onClose.bind(this)}>取 消</a>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import {InnerLoading} from '../../../lib/components'
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import client from '../../../lib/client';
import Form from "./form"

interface P {
  params: {
    id: string
  }
}

interface S {
  isError: boolean
  member: models.Member
}

export default class AddPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      member: null,
    }
  }

  componentDidMount() {
    client.members.get(this.props.params.id, (err: models.Error, res: models.Member) => {
      if (!err && res) {
        this.setState({
          isError: false,
          member: res
        })
      } else {
        this.setState({
          isError: true,
          member: null
        })
      }
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      isError: false,
      member: this.state.member
    })
  }

  render() {
    if (!this.state.member) return <InnerLoading />

    let errorEl = null
    if (this.state.isError) {
      errorEl = (
        <div>
          <div className="layerBg"></div>
          <div className="layerCon1 layerCon2">
          <i className="layerClose" onClick={this.onClose.bind(this)}></i>
          <div className="layer_sbbx2">此人没有党校账号，请联系管理员！</div>
          </div>
        </div>
      )
    }

    const formEl = <Form member={this.state.member} />

    return (
      <div className="main2">
        {errorEl}
        <div className="m2pos"><a className="m2pos_a" href="#">首页</a> > <a className="m2pos_a" href="#">二级栏目位置</a> > <span className="m2pos_cut">当前栏目位置</span></div>
        {formEl}
      </div>
    )
  }
}

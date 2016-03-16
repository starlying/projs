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
  winType: string
}

export default class DKXXJL extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      member: this.props.member,
      winType: ''
    }
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      member: nextProps.member,
      winType: ''
    })
  }

  openWin(winType: string, e) {
    this.setState({
      member: this.state.member,
      winType: winType
    })
  }

  render() {
    const member = this.state.member

    let winEl = null
    if (!this.state.winType) {
      winEl = (
        <div className="layerCon1 layerCon3 layerCon3b" style={{ height: "396px", width: "935px", marginLeft: "-467px", marginTop: "-196px" }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">党课学习记录</div>
          <div className="layer_btnBox1"><a className="m2fm_pubBtn2" href="javascript:;">新 增</a></div>
          <div className="layer_tab3">
            <table width="100%">
              <tbody>
                <tr className="layer_th3">
                  <td>开始时间</td>
                  <td>结束时间</td>
                  <td>地 点</td>
                  <td>课程名称</td>
                  <td>课 时</td>
                  <td>结业证书</td>
                  <td>操 作</td>
                </tr>
                <tr>
                  <td>2016-01-15</td>
                  <td>2016-01-15</td>
                  <td>北京</td>
                  <td>XXXXX XXXXX XXXXXXX党课</td>
                  <td>160</td>
                  <td>
                    <a href="#" className="cor_red">结业证书</a>
                  </td>
                  <td>
                    <a onClick={this.openWin.bind(this, 'upload')} href="javascript:;" className="m2fm_abtn">上传结业证书</a>
                    <a href="#" className="m2fm_abtn">编辑</a>
                    <a href="#" className="m2fm_abtn">删除</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    } else if (this.state.winType === 'upload') {
      winEl = (
        <div className="layerCon1 layerCon3 layerCon3b" style={{ width: "518px", height: "332px", marginTop: "-166px", marginLeft: "-259px" }}>
          <i className="layerClose" onClick={this.props.onClose.bind(this) }></i>
          <div className="layer_t">上传结业证书</div>
          <div className="m2nadBox" style={{ paddingTop: "40px" }}>
            <ul>
              <li>
                <span className="lay_s1" style={{ width: "60px" }}>结业时间</span>
                <input type="text" className="m2fm_int m2fm_int2 m2fm_int10" style={{ width: "295px" }} name="" />
              </li>
            </ul>
          </div>
          <a href="#" className="layer_btn2"></a>
          <div className="m2btnBox2 m2btnBox2a" style={{ paddingTop: "25px" }}>
            <a href="javascript:;" className="m2btn_a1">确 定</a>
            <a onClick={this.openWin.bind(this, '')} href="javascript:;" className="m2btn_a2">取 消</a>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="layerBg"></div>
        {winEl}
      </div>
    )
  }
}

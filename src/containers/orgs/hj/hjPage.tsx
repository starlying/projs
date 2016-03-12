import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as states from '../../../constants/states';
import * as models from '../../../api/models';
import * as utils from '../../../lib/utils';
import Location from "../../../components/location"
import SubNav from "../../../components/orgs/subNav"
import * as actions from '../../../actions/authActions';
import Form from "../../../components/orgs/add/form"

interface P {
  actions?: any,
  authState?: states.AuthState,
  params: {
    id: number
  }
}

interface S {
  orgs: Array<models.Org>
  id: number
}

class HJPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgs: null,
      id: null
    }
  }

  componentDidMount() {
    client.orgs.list(this.props.authState.member.orgID, (err: models.Error, res) => {
      let orgs = []
      if (!err && res.orgs) {
        orgs = res.orgs
      }
      this.setState({
        orgs: orgs,
        id: null
      })
    })
  }

  onAdd(e) {
    this.setState({
      orgs: this.state.orgs,
      id: 0
    })
  }

  onEdit(id, e) {
    this.setState({
      orgs: this.state.orgs,
      id: id
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      orgs: this.state.orgs,
      id: null
    })
  }

  render() {
    if (!this.state.orgs || this.state.orgs.length == 0) return <InnerLoading />

    const listEl = this.state.orgs.map((org: models.Org) => {
      return (
        <tr key={org.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><span className="cor_red">丁皓</span></td>
          <td>男</td>
          <td>政企分公司</td>
          <td>2011年2月</td>
          <td>4</td>
          <td>1300989900</td>
          <td>
            <Link className="m2fm_abtn" to={"/org/edit/" + org.id}>编辑</Link>
            <a className="m2fm_abtn" href="#">转出</a>
            <a className="m2fm_abtn" href="#">列为积极分子</a>
          </td>
        </tr>
      )
    })

    let pager = null
    // pager = (
    //   <div className="m2fm_page">
    //     <a href="#" className="m2fmPage_a">＜</a>
    //     <a href="#" className="m2fmPage_a on">1</a>
    //     <a href="#" className="m2fmPage_a">2</a>
    //     <a href="#" className="m2fmPage_a">3</a>
    //     <a href="#" className="m2fmPage_a">4</a>
    //     <a href="#" className="m2fmPage_a">5</a>
    //     <a href="#" className="m2fmPage_a">6</a>
    //     <a href="#" className="m2fmPage_a">7</a>
    //     <span className="m2fmPage_a2">...</span>
    //     <a href="#" className="m2fmPage_a">99</a>
    //     <a href="#" className="m2fmPage_a">100</a>
    //     <a href="#" className="m2fmPage_a">＞</a>
    //   </div>
    // )

    let formEl = null
    if (this.state.id) {
      //formEl = <Form org={new models.Org() } onClose={this.onClose.bind(this) } />
    }

    return (
      <div className="main2">
        {formEl}
        <Location />
        <SubNav {...this.props} />
        <div className="m2fm_stop">
          <span className="m2fm_ss1">换届届数：</span>
          <input type="text" name="" className="m2fm_int m2fm_int4" placeholder="" />
          <input type="submit" name="" className="m2submit" value="" />
          <a href="#" className="m2fm_btn1">新增换届记录</a>
        </div>
        <div className="m2fm_tabBox">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="6%">界数</td>
                <td width="10%">任期年限</td>
                <td width="10%">换届时间</td>
                <td width="13%">应到会人数</td>
                <td width="13%">实到会人数</td>
                <td width="34%">选举情况</td>
                <td width="14%">编辑</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>2011年2月</td>
                <td>3</td>
                <td>4</td>
                <td><p className="m2fm_pa">多行文本请留意位置多行文本请留意多行文本请留意多行文本</p></td>
                <td><a href="#" className="m2fm_abtn">编辑</a><a href="#" className="m2fm_abtn">查看</a></td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>2011年2月</td>
                <td>3</td>
                <td>4</td>
                <td><p className="m2fm_pa">多行文本请留意位置多行文本请留意多行文本请留意多行文本</p></td>
                <td><a href="#" className="m2fm_abtn">编辑</a><a href="#" className="m2fm_abtn">查看</a></td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>2011年2月</td>
                <td>3</td>
                <td>4</td>
                <td><p className="m2fm_pa">多行文本请留意位置多行文本请留意多行文本请留意多行文本</p></td>
                <td><a href="#" className="m2fm_abtn">编辑</a><a href="#" className="m2fm_abtn">查看</a></td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>2011年2月</td>
                <td>3</td>
                <td>4</td>
                <td><p className="m2fm_pa">多行文本请留意位置多行文本请留意多行文本请留意多行文本</p></td>
                <td><a href="#" className="m2fm_abtn">编辑</a><a href="#" className="m2fm_abtn">查看</a></td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>2011年2月</td>
                <td>3</td>
                <td>4</td>
                <td><p className="m2fm_pa">多行文本请留意位置多行文本请留意多行文</p></td>
                <td><a href="#" className="m2fm_abtn">编辑</a><a href="#" className="m2fm_abtn">查看</a></td>
              </tr>
            </tbody>
          </table>
          <div className="m2fm_page">
            <a href="#" className="m2fmPage_a">＜</a>
            <a href="#" className="m2fmPage_a on">1</a>
            <a href="#" className="m2fmPage_a">2</a>
            <a href="#" className="m2fmPage_a">3</a>
            <a href="#" className="m2fmPage_a">4</a>
            <a href="#" className="m2fmPage_a">5</a>
            <a href="#" className="m2fmPage_a">6</a>
            <a href="#" className="m2fmPage_a">7</a>
            <span className="m2fmPage_a2">...</span>
            <a href="#" className="m2fmPage_a">99</a>
            <a href="#" className="m2fmPage_a">100</a>
            <a href="#" className="m2fmPage_a">＞</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HJPage);

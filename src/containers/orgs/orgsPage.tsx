import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../lib/components'
import client from '../../lib/client';
import * as states from '../../constants/states';
import * as models from '../../api/models';
import * as utils from '../../lib/utils';
import Location from "../../components/location"
import SubNav from "../../components/orgs/subNav"
import * as actions from '../../actions/authActions';
import Form from "../../components/orgs/add/form"

interface P {
  actions?: any,
  authState?: states.AuthState,
  params: {
    id: string
  }
}

interface S {
  members: Array<models.Member>
  id: string
}

class OrgPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      members: null,
      id: null
    }
  }

  componentDidMount() {
    client.members.list('14', (err: models.Error, res) => {
      let members = []
      if (!err && res.members) {
        members = res.members
      }
      this.setState({
        members: members,
        id: null
      })
    })
  }

  onAdd(e) {
    this.setState({
      members: this.state.members,
      id: "-"
    })
  }

  onEdit(id, e) {
    this.setState({
      members: this.state.members,
      id: id
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      members: this.state.members,
      id: null
    })
  }

  render() {
    if (!this.state.members || this.state.members.length == 0) return <InnerLoading />

    const listEl = this.state.members.map((member: models.Member) => {
      return (
        <tr key={member.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><span className="cor_red">丁皓</span></td>
          <td>男</td>
          <td>政企分公司</td>
          <td>2011年2月</td>
          <td>4</td>
          <td>1300989900</td>
          <td>
            <Link className="m2fm_abtn" to={"/member/edit/" + member.id}>编辑</Link>
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
      formEl = <Form member={new models.Member() } onClose={this.onClose.bind(this)} />
    }

    return (
      <div className="main2">
        {formEl}
        <Location />
        <SubNav {...this.props} />
        <div className="m2fm_stop">
          <span className="m2fm_ss1">组织名称：</span>
          <input type="text" name="" className="m2fm_int m2fm_int8" />
          <span className="m2fm_ss1">是否有效：</span>
          <div className="m2fm_selContent">
            <input type="text" className="m2fm_int m2fm_int3 m2fm_int9" placeholder="全部" />
            <div className="m2fm_selBox m2fm_selBox2">
              <dl>
                <dd>党员</dd>
                <dd>非党员</dd>
              </dl>
            </div>
          </div>
          <span className="m2fm_ss1">组织类型：</span>
          <div className="m2fm_selContent">
            <input type="text" className="m2fm_int m2fm_int3" placeholder="全部" />
            <div className="m2fm_selBox">
              <dl>
                <dd>党员</dd>
                <dd>非党员</dd>
              </dl>
            </div>
          </div>
          <input type="submit" name="" className="m2submit" value="" />
          <a href="javascript:;" onClick={this.onAdd.bind(this) } className="m2addBtn">
            <img src="/assets/images/m2btn.jpg" width="76" height="32" />
          </a>
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2 m2pdTab">
          <table width="100%">
            <tbody>
              <tr className="m2th">
                <td width="33%">组织名称</td>
                <td width="25%">组织类型 </td>
                <td width="24%">是否有效</td>
                <td width="18%">操作</td>
              </tr>
              <tr>
                <td><span className="cor_red">政企分公司党委活动</span></td>
                <td>党委</td>
                <td>是</td>
                <td>
                  <a className="m2fm_abtn" href="#">授权</a>
                  <a className="m2fm_abtn" href="#">删除</a>
                  <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, "1")}>编辑</a>
                </td>
              </tr>
              <tr>
                <td><span className="cor_red">政企分公司党委活动</span></td>
                <td>党委</td>
                <td>是</td>
                <td>
                  <a className="m2fm_abtn" href="#">授权</a>
                  <a className="m2fm_abtn" href="#">删除</a>
                  <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, "1")}>编辑</a>
                </td>
              </tr>
              <tr>
                <td><span className="cor_red">政企分公司党委活动</span></td>
                <td>党委</td>
                <td>是</td>
                <td>
                  <a className="m2fm_abtn" href="#">授权</a>
                  <a className="m2fm_abtn" href="#">删除</a>
                  <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, "1")}>编辑</a>
                </td>
              </tr>
              <tr>
                <td><span className="cor_red">政企分公司党委活动</span></td>
                <td>党委</td>
                <td>是</td>
                <td>
                  <a className="m2fm_abtn" href="#">授权</a>
                  <a className="m2fm_abtn" href="#">删除</a>
                  <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, "1")}>编辑</a>
                </td>
              </tr>
              <tr>
                <td><span className="cor_red">政企分公司党委活动</span></td>
                <td>党委</td>
                <td>是</td>
                <td>
                  <a className="m2fm_abtn" href="#">授权</a>
                  <a className="m2fm_abtn" href="#">删除</a>
                  <a className="m2fm_abtn" href="javascript:;" onClick={this.onEdit.bind(this, "1")}>编辑</a>
                </td>
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
)(OrgPage);

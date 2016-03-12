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
import SubNav from "../../components/members/subNav"
import * as actions from '../../actions/authActions';
import * as links from '../../constants/links'

interface P {
  actions?: any,
  authState?: states.AuthState,
}

interface S {
  members: Array<models.Member>
}

class MemberPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      members: null
    }
  }

  componentDidMount() {
    client.members.list(this.props.authState.member.orgID, (err: models.Error, res) => {
      let members = []
      if (!err && res.members) {
        members = res.members
      }
      this.setState({
        members: members
      })
    })
  }

  render() {
    if (!this.state.members || this.state.members.length == 0) return <InnerLoading />

    const listEl = this.state.members.map((member: models.Member) => {
      return (
        <tr key={member.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><span className="cor_red">{member.userName}</span></td>
          <td>{member.userName}</td>
          <td>政企分公司</td>
          <td>2011年2月</td>
          <td>4</td>
          <td>1300989900</td>
          <td>
            <Link className="m2fm_abtn" to={"/members/edit/" + member.id}>编辑</Link>
            <a className="m2fm_abtn" href="#">转出</a><a className="m2fm_abtn" href="#">列为积极分子</a>
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

    return (
      <div className="main2">
        <Location />
        <SubNav />
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input type="text" name="" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">变动时间：</span>
          <input type="text" name="" className="m2fm_int m2fm_int2" placeholder="2016-01-20" />
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input type="text" name="" className="m2fm_int m2fm_int2" placeholder="2016-01-20" />
          <input type="submit" name="" className="m2submit" value="" />
          <Link to={links.MEMBERS_ADD} className="m2addBtn"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></Link>
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
            <tr className="m2th">
              <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td width="9%">姓名</td>
              <td width="9%">性别</td>
              <td width="16%">所属组织</td>
              <td width="13%">申请入党日期</td>
              <td width="13%">思想汇报份数</td>
              <td width="13%">手机</td>
              <td width="23%">操作</td>
            </tr>
            {listEl}
            </tbody>
          </table>
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
)(MemberPage);

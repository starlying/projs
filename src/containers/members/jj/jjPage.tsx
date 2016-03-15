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
import SubNav from "../../../components/members/subNav"
import * as actions from '../../../actions/authActions';
import * as constants from '../../../constants'
import LWFZDX from "../../../components/members/lwfzdx/form"
import ZHUANCHU from "../../../components/members/zhuanchu/form"
import DKXXJL from "../../../components/members/dkxxjl/form"
import FPPYR from "../../../components/members/fppyr/form"

interface P {
  actions?: any,
  authState?: states.AuthState,
}

interface S {
  members: Array<models.Member>
  winType: string
  id: number
}

class JJPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      members: null,
      winType: '',
      id: null
    }
  }

  componentDidMount() {
    client.members.list(this.props.authState.member.orgID, (err: models.Error, res) => {
      let members = []
      if (!err && res.members) {
        members = res.members
      }
      this.setState({
        members: members,
        winType: '',
        id: null
      })
    })
  }

  onEdit(winType, id, e) {
    this.setState({
      members: this.state.members,
      winType: winType,
      id: id
    })
  }

  onClose(e: React.MouseEvent) {
    this.setState({
      members: this.state.members,
      winType: '',
      id: null
    })
  }

  render() {
    if (!this.state.members || this.state.members.length == 0) return <InnerLoading />

    const listEl = this.state.members.map((member: models.Member) => {
      return (
        <tr key={member.id}>
          <td><input className="lay-rad" name="" type="checkbox" value="" /></td>
          <td><span className="cor_red">{member.userName}</span></td>
          <td>男</td>
          <td>政企分公司</td>
          <td>李四</td>
          <td>2011年2月</td>
          <td><a onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_DKXXJL, member.id)} href="javascript:;" className="cor_red">党课学习记录</a></td>
          <td>1300989900</td>
          <td>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_FPPYR, member.id)} href="javascript:;" className="m2fm_abtn">分配培养人</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_ZHUANCHU, member.id)} href="javascript:;" className="m2fm_abtn">转出</a>
            <a onClick={this.onEdit.bind(this, constants.WinTypes.MEMBERS_LWFZDX, member.id)} href="javascript:;" className="m2fm_abtn">列为发展对象</a>
            <Link className="m2fm_abtn" to={constants.Links.MEMBERS_EDIT_ + member.id}>编辑</Link>
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
    if (this.state.winType) {
      let member = null
      this.state.members.forEach((m: models.Member) => {
        if (this.state.id === m.id) {
          member = m
        }
      })
      if (this.state.winType === constants.WinTypes.MEMBERS_DKXXJL) {
        formEl = <DKXXJL member={member} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_LWFZDX) {
        formEl = <LWFZDX member={member} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_ZHUANCHU) {
        formEl = <ZHUANCHU member={member} onClose={this.onClose.bind(this)} />
      } else if (this.state.winType === constants.WinTypes.MEMBERS_FPPYR) {
        formEl = <FPPYR member={member} onClose={this.onClose.bind(this)} />
      }
    }

    return (
      <div className="main2">
        {formEl}
        <Location />
        <SubNav />
        <div className="m2fm_stop">
          <span className="m2fm_ss1">姓名：</span>
          <input type="text" name="" className="m2fm_int m2fm_int6" />
          <span className="m2fm_ss1">列入日期：</span>
          <input type="text" name="" className="m2fm_int m2fm_int2" placeholder="2016-01-20" />
          <span className="m2fm_ss1 m2fm_ss2">至</span>
          <input type="text" name="" className="m2fm_int m2fm_int2" placeholder="2016-01-20" />
          <input type="submit" name="" className="m2submit" value="" />
          <Link to={constants.Links.MEMBERS_ADD} className="m2addBtn"><img src="/assets/images/m2btn.jpg" width="76" height="32" /></Link>
        </div>
        <div className="m2fm_tabBox m2fm_tabBox2">
          <table width="100%">
            <tbody>
            <tr className="m2th">
              <td width="4%"><input className="lay-rad" name="" type="checkbox" value="" /></td>
              <td>姓名</td>
              <td>性别</td>
              <td>所属组织</td>
              <td>培养人</td>
              <td>列入日期</td>
              <td>党课</td>
              <td>手机</td>
              <td width="20%">操作</td>
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
)(JJPage);

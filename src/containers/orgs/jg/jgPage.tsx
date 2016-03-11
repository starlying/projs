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
import * as actions from '../../../actions/authActions';

interface P {
  actions?: any,
  authState?: states.AuthState,
}

interface S {
  members: Array<models.Member>
}

class JGPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      members: null
    }
  }

  componentDidMount() {
    client.members.list('14', (err: models.Error, res) => {
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
          <td><span className="cor_red">丁皓</span></td>
          <td>男</td>
          <td>政企分公司</td>
          <td>2011年2月</td>
          <td>4</td>
          <td>1300989900</td>
          <td>
            <Link className="m2fm_abtn" to={"/member/edit/" + member.id}>编辑</Link>
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
        <div className="m2sfBox">
          <strong>身份证：</strong>
          <input type="text" name="" placeholder="请输入身份证号码" className="m2c1_int" />
          <input type="submit" name="" className="m2submit" value="" />
        </div>
        <div className="m2fm_t1">中共中国移动通信集团河北有限公司直属机关委员会</div>
        <div className="m2fm_alink">
          <a href="/orgs/1" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <div className="clear"></div>
        </div>
        <div className="m2fm_t1">中移全通系统集成有限公司党总支</div>
        <div className="m2fm_alink">
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <div className="clear"></div>
        </div>
        <div className="m2fm_t1">中移全通系统集成有限公司党总支</div>
        <div className="m2fm_alink">
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <div className="clear"></div>
        </div>
        <div className="m2fm_t1">中移全通系统集成有限公司党总支</div>
        <div className="m2fm_alink">
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">工程部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <a href="#" className="m2fm_a">财务部党支部</a>
          <a href="#" className="m2fm_a">人力资源部党支部</a>
          <a href="#" className="m2fm_a">综合部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">发展计划部党支部</a>
          <a href="#" className="m2fm_a">市场经营部党支部</a>
          <div className="clear"></div>
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
)(JGPage);

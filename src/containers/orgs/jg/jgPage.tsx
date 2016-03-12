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
  orgs: Array<models.Org>
  orgMap: {[index: number]: Array<models.Org>}
}

class JGPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      orgs: null,
      orgMap: {}
    }
  }

  componentDidMount() {
    client.orgs.list(this.props.authState.member.orgID, (err: models.Error, res: {
      orgs: Array<models.Org>
    }) => {
      let orgs = []
      if (!err && res.orgs) {
        orgs = res.orgs
      }
      this.setState({
        orgs: orgs,
        orgMap: {}
      })
      orgs.forEach((child: models.Org) => {
        if (child.childrenCount > 0) {
          client.orgs.list(this.props.authState.member.orgID, (err: models.Error, res: {
            orgs: Array<models.Org>
          }) => {
            this.state.orgMap[child.id] = orgs
            this.setState({
              orgs: this.state.orgs,
              orgMap: this.state.orgMap
            })
          });
        }
      })
    })
  }

  render() {
    if (!this.state.orgs || this.state.orgs.length == 0) return <InnerLoading />

    let isLevel = false
    this.state.orgs.forEach((org: models.Org) => {
      if (org.childrenCount > 0){
        isLevel = true
      }
    })

    let listEl = null
    if (isLevel) {
      listEl = this.state.orgs.map((org: models.Org) => {
        const childOrgs = this.state.orgMap[org.id]
        const childEl = childOrgs.map((child: models.Org) => {
          return <a key={child.id} href="#" className="m2fm_a">{child.organizaName}</a>
        })
        return (
          <div key={org.id}>
            <div className="m2fm_t1">{org.organizaName}</div>
            <div className="m2fm_alink">
              {childEl}
              <div className="clear"></div>
            </div>
          </div>
        )
      })
    } else {
      const childEl = this.state.orgs.map((org: models.Org) => {
        return <a key={org.id} href="#" className="m2fm_a">{org.organizaName}</a>
      })
      listEl = (
        <div>
          <div className="m2fm_t1">{this.props.authState.org.organizaName}</div>
          <div className="m2fm_alink">
            {childEl}
            <div className="clear"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="main2">
        <Location />
        {listEl}
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

import * as React from 'react'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {InnerLoading} from '../../../lib/components'
import client from '../../../lib/client';
import * as states from '../../../constants/states';
import * as links from '../../../constants/links';
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
    if (!this.state.orgs) return <InnerLoading />

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
          return <Link key={child.id} to={links.INDEX + "?orgID=" + child.id} className="m2fm_a">{child.orgName}</Link>
        })
        return (
          <div key={org.id}>
            <div className="m2fm_t1"><Link key={org.id} to={links.INDEX + "?orgID=" + org.id}>{org.orgName}</Link></div>
            <div className="m2fm_alink">
              {childEl}
              <div className="clear"></div>
            </div>
          </div>
        )
      })
    } else {
      const childEl = this.state.orgs.map((org: models.Org) => {
        return <Link key={org.id} to={links.INDEX + "?orgID=" + org.id} className="m2fm_a">{org.orgName}</Link>
      })
      listEl = (
        <div>
          <div className="m2fm_t1"><Link key={this.props.authState.org.id} to={links.INDEX + "?orgID=" + this.props.authState.org.id}>{this.props.authState.org.orgName}</Link></div>
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

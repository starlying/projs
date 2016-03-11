import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router';
import * as links from '../../constants/links'

interface P {
  params: {
    id: string
  }
}

class SubNav extends React.Component<P, {}> {
  render() {
    return (
      <div className="m2fmNav">
        <ul>
          <li><Link to={links.ORGS_JG} className="m2fm_a1" activeClassName="m2fm_a2">组织架构</Link></li>
          <li><Link to={links.ORGS} className="m2fm_a1" activeClassName="m2fm_a2">组织管理</Link></li>
          <li><Link to={links.ORGS_HJ} className="m2fm_a1" activeClassName="m2fm_a2">换届选举</Link></li>
          <li><a href="#" className="m2fm_a1">领导成员管理</a></li>
        </ul>
      </div>
    )
  }
}

export default SubNav

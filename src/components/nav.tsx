import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-router';
import * as links from '../constants/links'

class Nav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="nav">
        <ul>
         <li><IndexLink to={links.INDEX} className="nav_a" activeClassName="on">首  页</IndexLink></li>
         <li><a href="#" className="nav_a">党员管理</a></li>
         <li><a href="#" className="nav_a">党委工作</a></li>
         <li><Link to={links.ORGS} className="nav_a" activeClassName="on">党组织</Link></li>
         <li><Link to={links.MEMBERS} className="nav_a" activeClassName="on">党员发展</Link></li>
         <li><a href="#" className="nav_a">党费管理</a></li>
         <li><a href="#" className="nav_a">组织生活</a></li>
         <li><a href="#" className="nav_a">会议管理</a></li>
         <li><a href="#" className="nav_a">统计查询</a></li>
         <li><a href="#" className="nav_a">学习发展</a></li>
        </ul>
      </div>
    )
  }
}

export default Nav

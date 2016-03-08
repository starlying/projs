import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-router';

class Nav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="nav">
        <ul>
         <li><IndexLink to="/" className="nav_a" activeClassName="on">首  页</IndexLink></li>
         <li><a href="#" className="nav_a">党委工作</a></li>
         <li><a href="#" className="nav_a">党组织</a></li>
         <li><Link to="/party-member" className="nav_a" activeClassName="on">党员发展</Link></li>
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

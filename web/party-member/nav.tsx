import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Nav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="m2fmNav">
       <ul>
        <li><a href="javascript:;" className="m2fm_a1 m2fm_a2">申请人管理</a></li>
        <li><a href="#" className="m2fm_a1">积极分子管理</a></li>
        <li><a href="#" className="m2fm_a1">发展对象管理</a></li>
        <li><a href="#" className="m2fm_a1 on">预备党员管理</a></li>
       </ul>
      </div>
    )
  }
}

export default Nav

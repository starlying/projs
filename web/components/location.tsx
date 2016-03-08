import * as React from 'react'

export default class Location extends React.Component<{}, {}> {
  render() {
    return (
      <div className="m2pos">
        <a className="m2pos_a" href="#">首页</a>
        &gt;
        <a className="m2pos_a" href="#">二级栏目位置</a>
        &gt;
        <span className="m2pos_cut">当前栏目位置</span>
      </div>
    )
  }
}

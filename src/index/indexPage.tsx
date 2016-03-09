import * as React from 'react'
import {Loading} from '../lib/components'
import Message from "./message"
import Info from "./info"
import Yewu from "./yewu"
import Banner from "./banner"
import Tongji from "./tongji"

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Message />
        <Info />
        <Yewu />
        <Banner />
        <Tongji />
      </div>
    )
  }
}

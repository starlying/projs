import * as React from 'react'
import {Loading} from '../lib/components'
import Top from "../components/top"
import Header from "../components/header"
import Nav from "../components/nav"
import Footer from "../components/footer"

export default class App extends React.Component<any, {}> {
  render() {
    return (
      <div>
        <Top />
        <Header />
        <Nav />
        {this.props.children}
        <Footer />
        <Loading />
      </div>
    )
  }
}

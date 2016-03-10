import * as React from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Loading} from '../lib/components'
import Top from "../containers/top"
import Header from "../containers/header"
import Nav from "../components/nav"
import Footer from "../components/footer"
import * as actions from '../actions/authActions';

interface P {
  actions?: any,
  appState?: any,
  children?: any
}

class App extends React.Component<P, {}> {
  componentWillMount() {
    if (this.props.appState.isAnonymous) {
      browserHistory.push('/login')
    }
  }

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

function mapStateToProps(state) {
  return {
    appState: state.authAppState
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
)(App);

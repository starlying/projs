import * as React from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Loading} from '../lib/components'
import * as states from '../constants/states';
import Top from "../containers/top"
import Header from "../containers/header"
import Nav from "../components/nav"
import Footer from "../components/footer"
import * as actions from '../actions/authActions';

interface P {
  actions?: any,
  authState?: any,
  children?: any
}

class App extends React.Component<P, {}> {
  componentWillMount() {
    if (this.props.authState.isAnonymous) {
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
)(App);

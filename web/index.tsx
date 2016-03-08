import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as lang from '../lib/lang'
import * as utils from '../lib/utils'
import createStore from '../lib/redux/createStore'
import reducer from './actions/reducer'
import App from './containers/app'
import IndexPage from './index/indexPage'
import PartyMemberPage from './party-member/partyMemberPage'
import PartyMemberAddPage from './party-member/add/partyMemberAddPage'
import NotFoundPage from './components/notFoundPage';
import LoginPage from './login/loginPage'

utils.Page.xDomain()
const store = createStore(reducer, {})
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={LoginPage}/>
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="/party-member" component={PartyMemberPage}/>
        <Route path="/party-member/add" component={PartyMemberAddPage}/>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

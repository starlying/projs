import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as utils from './lib/utils'
import configureStore from './store/configureStore';
import App from './containers/app'
import IndexPage from './index/indexPage'
import PartyMemberPage from './member/partyMemberPage'
import PartyMemberAddPage from './member/add/partyMemberAddPage'
import NotFoundPage from './components/notFoundPage';
import LoginPage from './containers/loginPage'

utils.Page.xDomain()
const store = configureStore();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={LoginPage}/>
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="/member" component={PartyMemberPage}/>
        <Route path="/member/add" component={PartyMemberAddPage}/>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

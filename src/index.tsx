import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as utils from './lib/utils'
import configureStore from './store/configureStore';
import App from './containers/app'
import IndexPage from './components/index/indexPage'
import MembersPage from './components/member/membersPage'
import AddPage from './components/member/add/addPage'
import NotFoundPage from './components/notFoundPage';
import LoginPage from './containers/login/loginPage'

utils.Page.xDomain()
const store = configureStore();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={LoginPage}/>
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="/member" component={MembersPage}/>
        <Route path="/member/add" component={AddPage}/>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

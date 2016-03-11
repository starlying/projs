import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as utils from './lib/utils'
import configureStore from './store/configureStore';
import App from './containers/app'
import IndexPage from './components/index/indexPage'
import OrgsPage from './containers/orgs/orgsPage'
import JGPage from './containers/orgs/jg/jgPage'
import HJPage from './containers/orgs/hj/hjPage'
import MembersPage from './containers/members/membersPage'
import AddPage from './components/members/add/addPage'
import EditPage from './components/members/edit/editPage'
import NotFoundPage from './components/notFoundPage';
import LoginPage from './containers/login/loginPage'
import * as links from './constants/links'

utils.Page.xDomain()
const store = configureStore();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={links.LOGIN} component={LoginPage}/>
      <Route path={links.INDEX} component={App}>
        <IndexRoute component={IndexPage} />
        <Route path={links.ORGS} component={OrgsPage}/>
        <Route path={links.ORGS_JG} component={JGPage}/>
        <Route path={links.ORGS_HJ} component={HJPage}/>
        <Route path={links.MEMBERS} component={MembersPage}/>
        <Route path={links.MEMBERS_ADD} component={AddPage}/>
        <Route path={links.MEMBERS_EDIT_} component={EditPage}/>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

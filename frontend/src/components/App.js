import React from 'react';
import { Switch, Route } from 'react-router-dom'
//import logo from '../logo.svg';
import '../styles/App.css';
import LinkList from './LinkList'
import Header from './Header'
import Login from './Login'

import CreateLink from './CreateLink'

export default function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  )
}



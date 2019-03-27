import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './containers/create';
import Home from './containers/home';
import Result from './containers/result';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/create" component={Create} />
    <Route path="/result" component={Result} />
  </Switch>
);

export default App;

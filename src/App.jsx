import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/home';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);

export default App;

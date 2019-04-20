import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import History from './history';

import Create from './containers/create';
import Home from './containers/home';
import Landings from './containers/landings';
import Programs from './containers/programs';

const App = () => (
  <Router history={History}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/landings" exact component={Landings} />
      <Route path="/landings/:idLanding" exact component={Programs} />
      <Route path="/landings/:idLanding/create" component={Create} />
    </Switch>
  </Router>
);

export default App;

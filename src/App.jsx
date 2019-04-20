import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './containers/create';
import Home from './containers/home';
import Landings from './containers/landings';
import Programas from './containers/programas';
import Result from './containers/result';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/landings" exact component={Landings} />
    <Route path="/:idLanding" exact component={Programas} />
    <Route path="/:idLanding/create" component={Create} />
    <Route path="/result" component={Result} />
  </Switch>
);

export default App;

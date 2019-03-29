import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './containers/create';
import Home from './containers/home';
import Landings from './containers/landings';
import Programs from './containers/programs';
import Result from './containers/result';
import SortableComponent from './containers/prueba';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/landings" exact component={Landings} />
    <Route path="/landings/:idLanding" exact component={Programs} />
    <Route path="/landings/:idLanding/create" component={Create} />
    <Route path="/landings/:idLanding/result" component={Result} />
    <Route path="/prueba" component={SortableComponent} />
  </Switch>
);

export default App;

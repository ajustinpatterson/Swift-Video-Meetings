import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../Landing/Landing';
import App from '../../containers/App/App';
import Meeting from '../../containers/Meeting/Meeting';
import PowderRoom from '../PowderRoom/PowderRoom';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/powderroom" component={PowderRoom} />
      <Route path="/meeting" component={Meeting} />
      <Route path="/main" component={App} />
    </Switch>
  );
}

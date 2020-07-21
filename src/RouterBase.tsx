import http from 'http';
import React from 'react';

import {
  StaticRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './home';

function RouterBase(req : http.IncomingMessage, context : { url?: string}) : JSX.Element {
  return (
    <Router location={req.url} context={context}>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
        )
      </Switch>
    </Router>
  );
}

export default RouterBase;

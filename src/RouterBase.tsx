import http from 'http';
import React from 'react';

import {
  StaticRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AppExample from './AppExample';
import Home from './home';

function RouterBase(req: http.IncomingMessage, context : { url?: string}) : JSX.Element {
  return (
    <Router location={req.url} context={context}>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/app-example">
          <AppExample />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
        )
      </Switch>
    </Router>
  );
}

interface MetaObj {
  description: string;
  keywords: string;
  title: string;
}

const metaMap: {[url: string]: MetaObj} = {
  '/home': {
    description: 'Home description',
    keywords: 'Home',
    title: 'Home',
  },
  '/app-example': {
    description: 'App example description',
    keywords: 'App, Example',
    title: 'App Example',
  },
};

function getMetaObj(url: string) : MetaObj {
  return metaMap[url];
}

export default RouterBase;

export {
  getMetaObj,
};

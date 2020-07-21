import fs from 'fs';
import http from 'http';
import path from 'path';
import ReactDOMServer from 'react-dom/server';

import RouterBase from './RouterBase';

function readIndexHtml() : string {
  const indexFile = path.resolve('./dist/index.html');
  const result = fs.readFileSync(indexFile, 'utf8');

  if (result) {
    return result;
  }

  return `<!DOCTYPE html>
 <html lang="en">
 <head></head>
 <body>
 <div id="root"></div>
 </body>
 </html>`;
}

function runSSR() {
  const indexHtml = readIndexHtml();

  http.createServer((req, res) => {
    // This context object contains the results of the render
    const context : {url?: string} = {};

    const html = ReactDOMServer.renderToString(RouterBase(req, context));

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      });
      res.end();
    } else {
      res.write(indexHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
      res.end();
    }
  })
    .listen(3000);
}

runSSR();

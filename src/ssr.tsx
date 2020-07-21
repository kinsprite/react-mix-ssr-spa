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

interface ManifestJson {
  files: {[key:string]: string};
}

function getLinks(manifestJson: ManifestJson) : string {
  let links = '';
  const { files } = manifestJson;

  if (files['ssr.css']) {
    links += `<link rel="stylesheet" type="text/css" href="${files['ssr.css']}">`;
  }

  if (files['spa.css']) {
    links += `<link rel="stylesheet" type="text/css" href="${files['spa.css']}">`;
  }

  return links;
}

function getScripts(manifestJson: ManifestJson) : string {
  let scripts = '';
  const { files } = manifestJson;

  if (files['spa.js']) {
    scripts += `<script charset="utf-8" src="${files['spa.js']}"></script>`;
  }

  return scripts;
}

function runSSR(manifestJson: ManifestJson) : void {
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
      res.write(indexHtml.replace('</head>', `${getLinks(manifestJson)}</head>`)
        .replace('</body>', `${getScripts(manifestJson)}</body>`)
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`));
      res.end();
    }
  })
    .listen(3000);
}

export default runSSR;

import ReactDOMServer from 'react-dom/server';
import http from 'http';

import RouterBase, { getMetaObj } from './RouterBase';

import './root.css';

interface ManifestJson {
  files: {[key:string]: string};
}

interface SSRParam {
  context : {url?: string};
  req: http.IncomingMessage;
  indexHtml: string;
   manifestJson: ManifestJson;
}

function getMetaAndTitle(url: string): string {
  const meta = getMetaObj(url);

  if (!meta) {
    return '';
  }

  let res = '';

  res += `<meta name="description" content="${meta.description}" />`;
  res += `<meta name="keywords" content="${meta.keywords}" />`;
  res += `<title>${meta.title}</title>`;

  return res;
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

  if (files['spa.js']) {
    links += `<link rel="preload" as="script" href="${files['spa.js']}">`;
  }

  return links;
}

function getScripts(manifestJson: ManifestJson) : string {
  let scripts = '';
  const { files } = manifestJson;

  if (files['spa.js']) {
    scripts += `<script src="${files['spa.js']}"></script>`;
  }

  return scripts;
}

function runSSR({
  context, req, indexHtml, manifestJson,
} : SSRParam) : string {
  const html = ReactDOMServer.renderToString(RouterBase(req, context));

  if (context.url) {
    return html;
  }

  return indexHtml.replace(/<title>.+<\/title>/, '')
    .replace('</head>', `${getMetaAndTitle(req.url)}${getLinks(manifestJson)}</head>`)
    .replace('</body>', `${getScripts(manifestJson)}</body>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

export default runSSR;

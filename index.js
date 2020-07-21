/* eslint-disable */
'use strict';

const path = require('path')

const manifestJson = require(path.resolve('./dist/rmf-manifest.json'));

const runSSR = require(path.resolve(path.resolve(path.join('./dist', manifestJson.files['ssr.js']))));

runSSR.default(manifestJson);

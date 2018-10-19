const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const express = require('express');
const request = require('request');

const app = new (express)();
const port = 3100;

const compiler = webpack(config);
app.use(webpackDevMiddleware(
  compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }
));
app.use(
  webpackHotMiddleware(compiler)
);
app.use(
  express.static(`${__dirname}/`)
);

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/static_media', (req, res) => {
  const url = 'http://localhost:5050/static_media' + req.url;
  const headers = {
    'username': process.env.sso_user,
    'password': process.env.sso_pass,
  };
  req.pipe(request({
    url,
    headers,
  })).pipe(res);
});

app.use('/api', (req, res) => {
  const url = 'http://localhost:5050/api' + req.url;
  const headers = {
    'username': process.env.sso_user,
    'password': process.env.sso_pass,
  };
  req.pipe(request({
    url,
    headers,
  })).pipe(res);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

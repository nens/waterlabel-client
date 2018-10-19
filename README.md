WATERLABEL-CLIENT
=================

A [Waterlabel](https://www.waterlabel.net/) front-end using [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [Bootstrap](https://react-bootstrap.github.io/) and [Leaflet](https://github.com/PaulLeCam/react-leaflet).



Local installation
------------------

You'll need a fairly recent Node.js installation (v6.9.1 or higher) that includes `npm`. On Ubuntu you may need to install the `nodejs-legacy` package.

Install [Yarn](https://yarnpkg.com/en/) first if you don't have it set up already. Should be as easy as `$ npm install -g yarn`.

With Yarn, Node and npm installed, run:

```bash
$ yarn install
```

This will parse `package.json` and `yarn.lock` and will install the proper versions of all dependencies.


Building a production bundle
----------------------------

```bash
$ npm run build
```

This will run webpack in production mode. The result will be a `bundle.js` file in the `dist/` directory.


Releasing a new bundle to Github
--------------------------------

See [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

First make a copy of `deploy/auth.json.example` named `deploy/auth.json`.

Generate [a new Personal Access Token](https://github.com/settings/tokens) on Github first and copy that token into `deploy/auth.json` in the place of `Your-token-that-you-created-on-github`.

Then run the release command as such:

```bash
$ npm run release
```
If all goes well, a [new release should appear](https://github.com/nens/waterlabel-client/releases) on Github.


Development
-----------

If you work on this project, please submit changes via Pull Requests and follow the [commit guidelines as outlined here](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance).

These commit messages will be used to auto-generate `CHANGELOG.md`.

Have a look at the [buck-trap README](https://github.com/nens/buck-trap/blob/master/README.md) for more information about the release procedure.

Please use ESLint in your editor and set indentation to 2 spaces.

Browser development extensions
------------------------------

This front-end uses React and Redux. These extensions may help:

- React Devtools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

- Redux Devtools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) or [Firefox](https://addons.mozilla.org/en-Gb/firefox/addon/remotedev/)


Starting the devserver
----------------------

```bash
$ npm start
```

This will start a development server with Hot Module Replacement turned on.

It defaults to run on [http://localhost:5050](http://localhost:5050).


Proxy
-----

The file `server.js` proxies requests to `/api` to another webserver.
This webserver can be configured to suit your needs (ie. point to a local server).


Deployment
----------

For a production deployment, please refer to [waterlabel-site](https://github.com/nens/waterlabel-site/).

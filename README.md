Toggle UI
=========

A ui for managing your toggles.

[![Build Status](https://travis-ci.org/qandidate-labs/qandidate-toggle-ui.svg?branch=master)](https://travis-ci.org/qandidate-labs/qandidate-toggle-ui)

## About

Read our blog post series about this repository at:
- http://labs.qandidate.com/blog/2014/08/18/a-new-feature-toggling-library-for-php/
- http://labs.qandidate.com/blog/2014/08/19/open-sourcing-our-feature-toggle-api-and-ui/

## Installation

First, install the dependencies:
```
bower install
```

To use the UI, you will need to create your config.js to configure the API endpoint.

```
# From project root
$ cp app/js/config.js.dist app/js/config.js
# Configure your endpoint URL
$ vim app/js/config.js
```
You are now ready to serve the UI with your favorite webserver.

## Tests

If you want to run the karma tests, you'll need to install the dependencies:

```
$ npm install
```

You can now run the karma tests:

```
$ scripts/test.sh --single-run
```

And the e2e tests:

```
$ scripts/web-server.js
$ scripts/e2e-test.sh --single-run
```

## License

MIT, see LICENSE.

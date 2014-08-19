Toggle UI
=========

A ui for managing your toggles.

## Installation

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
$ scripts/e2e-test.sh --single-run
```

## License

MIT, see LICENSE.

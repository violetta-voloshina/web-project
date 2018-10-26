const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const serveStatic = require('serve-static');
const config = require('./config')();
const logger = require('./utils/logger.js');

async function init() {
	await require('./pathsBootstrap')();

	const app = express();

	require('./utils/express/async')(app);

	app.set('views', './views');
	app.set('view engine', 'pug');

	app.use(bodyParser.json());
	app.use('/uploads', serveStatic(config.path.uploads));
	app.use('/static', serveStatic('./static'));
	await require('./db').init();
	require('./routes')(app);

	app.listen(config.listen.port, config.listen.host);
	logger(`Server started on ${config.listen.host}:${config.listen.port}`);

	app.use((err, req, res, next) => {
		logger(err);

		if (res.headersSent) {
			return next(err);
		}

		res.status(err.statusCode || 500).json(
			_(err).pick('name', 'message', 'userMessage')
		);
	});
}

if (module.parent) {
	module.exports = init;
} else {
	init().catch((err) => {
		logger(err);
		process.exit(1);
	});
}

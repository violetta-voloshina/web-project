const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');
const logger = require('./utils/logger');
const config = require('./config')();
const _ = require('underscore');

async function init() {
	await require('./pathsBootstrap')();

	const app = express();

	const server = http.Server(app);

	require('./utils/express/async')(app);

	app.set('views', './views');
	app.set('view engine', 'pug');
	app.locals = require('./views/helpers');

	app.use(bodyParser.json());

	app.use(cookieParser('1ea87c9bd1ef415eaf11599cce75836f', {
		path: '/',
		httpOnly: true,
		maxAge: null
	}));

	app.use('/static', serveStatic('./static'));
	app.use('/uploads', serveStatic(config.paths.uploads));
	await require('./db').init();
	require('./routes')(app);

	server.listen(config.listen.port);
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

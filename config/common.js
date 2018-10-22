const mongodbUri = require('mongodb-uri');
const os = require('os');
const path = require('path');
const {configBuilder} = require('./index');

configBuilder.register({
	name: 'common',
	config: {
		mongodb: {
			url: (config) => mongodbUri.format({
				database: config.mongodb.database,
				hosts: [{
					host: config.mongodb.host,
					port: config.mongodb.port
				}]
			}),
			host: '127.0.0.1',
			port: 27017,
			database: 'photo-studio'
		},
		defaultLimit: 20,
		path: {
			data: (config, name) => `/var/tmp/photo-${name}`,
			uploads: (config) => path.join(
				config.path.data,
				'uploads'
			),
			uploadsTmp: (config, name) => path.join(
				os.tmpdir(),
				`photo-${name}-uploadsTmp`
			)
		}
	}
});

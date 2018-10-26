const {promisify} = require('util');
const _ = require('underscore');
const mkdir = promisify(require('mkdirp'));
const config = require('./config')();

module.exports = () => Promise.all(
	_([
		config.path.uploads,
		config.path.uploadsTmp
	]).map((path) => mkdir(path))
);
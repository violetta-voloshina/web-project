const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const multipipe = promisify(require('multipipe'));
const config = require('../config')();
const rename = promisify(fs.rename);
const unlink = promisify(fs.unlink);

function exist(filePath) {
	return new Promise((resolve) => {
		fs.stat(filePath, (err) => resolve(!err));
	});
}

exports.updateFiles = async (stream, originalName) => {
	const hash = crypto.createHash('md5');

	stream.on('data', (chunk) => {
		hash.update(chunk);
	});

	const tmpFilePath = path.join(
		config.paths.uploadsTmp,
		crypto.randomBytes(20).toString('hex')
	);

	await multipipe(stream, fs.createWriteStream(tmpFilePath));

	const fileName = hash.digest('hex') +
		path.extname(originalName).toLowerCase();

	const fullFileName = path.join(
		config.paths.uploads,
		fileName
	);

	if (await exist(fullFileName)) {
		await unlink(tmpFilePath);
	} else {
		await rename(tmpFilePath, fullFileName);
	}

	return fileName;
};
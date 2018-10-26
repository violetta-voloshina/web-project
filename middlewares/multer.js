const multer = require('multer');
const fs = require('fs');
const _ = require('underscore');
const {updateFiles} = require('../utils/files');
const error = require('../utils/errors.js');
const config = require('../config')();

class DiskStorage {
	_handleFile(req, file, callback) {
		updateFiles(file.stream, file.originalname)
			.then((name) => callback(null, {name, realName: file.originalname}));
	}

	_removeFile(req, file, callback) {
		fs.unlink(file.path, callback);
	}
}

const fileFilter = (req, file, callback) => {
	console.log(file.mimetype);
	if (_(config.allowedAttachmentMimeTypes).contains(file.mimetype)){
		callback(null, true);
	} else {
		callback(new error.ForbiddenAttachmentType(), false);
	}
};

module.exports = multer({storage: new DiskStorage(), fileFilter}).any();
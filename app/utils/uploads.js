const axios = require('axios');
const _ = require('underscore');

exports.uploadFile = (file) => {
	if (!file) {
		return Promise.resolve();
	}

	const formData = new window.FormData();

	formData.append('files[]', file);

	return axios.post('/files/upload', formData).then((res) => res.data);
};

exports.uploadImage = (image) => {
	if (image && image.file) {
		return exports.uploadFile(image.file).then((file) => {
			delete image.file;

			_(image).extend(file);
			return image;
		});
	}

	return Promise.resolve(image);
};

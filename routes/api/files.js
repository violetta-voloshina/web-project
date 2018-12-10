const _ = require('underscore');
const multer = require('../../middlewares/multer');
const checkAdmin = require('../../middlewares/checkAdmin');

module.exports = (app) => {
	app.post('/files/upload', checkAdmin(), multer, (req, res) => {
		const image = _(req.files)
			.chain()
			.first()
			.pick('name', 'realName')
			.value();

		res.json(image);
	});
};

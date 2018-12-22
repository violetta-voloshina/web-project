const _ = require('underscore');
const multer = require('../../middlewares/multer');

module.exports = (app) => {
	app.post('/files/upload', multer, (req, res) => {
		const image = _(req.files)
			.chain()
			.first()
			.pick('name', 'realName')
			.value();

		res.json(image);
	});
};

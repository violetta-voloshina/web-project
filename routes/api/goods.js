const _ = require('underscore');
const schemas = require('../schemas')
const db = require('../../db');
const validate = require('../../utils/validate');
const multer = require('../../middlewares/multer');

module.exports = function(app) {
	app.get('/api/goods', async (req, res) => {
		const goods = await db.goods.find({}).toArray();

		res.json({goods, total: goods.length})
	});

	app.post('/api/goods', multer, async (req, res) => {
		console.log(req.files);

		const image = _(req.files)
			.chain()
			.first()
			.pick('name', 'realName')
			.value();

		const params = validate(req, {
			name: {
				type: 'string',
				required: true,
				minLength: 5,
				maxLenth: 50,
			},
			description: {
				type: 'string',
				minLength: 1,
				maxLenth: 50,
			},
			type: {
				enum: ['frame', 'album', 'headphone', 'batterie', 'cord', 'mouse', 'disk']
			},
			frame: schemas.frame,
			album: schemas.album,
			headphone: schemas.headphone,
			batterie: schemas.batterie,
			cord: schemas.cord,
			mouse: schemas.mouse,
			disk: schemas.disk
		});

		params.type = 'frame';
		await db.goods.insertOne(params);

		res.redirect('/');
	});
}

const db = require('../../db');
const validate = require('../../utils/validate');
const schemas = require('../schemas')

module.exports = function(app) {
	app.get('/api/goods', async (req, res) => {
		const goods = await db.goods.find({}).toArray();

		res.json({goods, total: goods.length})
	});

	app.post('/api/goods', async (req, res) => {
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
				enum: ['frame', 'album', 'headphone', 'batterie', 'cord', 'mouse', 'disk'],
				required: true
			},
			frame: schemas.frame,
			album: schemas.album,
			headphone: schemas.headphone,
			batterie: schemas.batterie,
			cord: schemas.cord,
			mouse: schemas.mouse,
			disk: schemas.disk
		});

		await db.goods.insertOne(params);

		res.sendStatus(200);
	});
}

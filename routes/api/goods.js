const schemas = require('../schemas');
const db = require('../../db');
const validate = require('../../utils/validate');

module.exports = function(app) {
	app.get('/api/goods', async (req, res) => {
		const params = validate(req, {
			type: {
				enum: ['frame', 'album', 'headphone', 'batterie', 'cord', 'mouse', 'disk']
			}
		});

		const goods = await db.goods.find(params).toArray();

		res.json({goods, total: goods.length});
	});

	app.post('/api/goods', async (req, res) => {
		const params = validate(req, {
			name: {
				type: 'string',
				required: true,
				minLength: 1,
				maxLenth: 50
			},
			description: {
				type: 'string'
			},
			image: schemas.image,
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

		await db.goods.insertOne(params);

		res.redirect('/');
	});
};

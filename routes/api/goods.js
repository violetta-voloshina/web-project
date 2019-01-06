const schemas = require('../schemas');
const db = require('../../db');
const checkAdmin = require('../../middlewares/checkAdmin');
const validate = require('../../utils/validate');

module.exports = (app) => {
	app.get('/api/goods', async (req, res) => {
		const {offset, limit, ...params} = validate(req, {
			type: {
				enum: ['frame', 'album', 'headphone', 'batterie', 'cord', 'mouse', 'disk']
			},
			limit: {
				type: 'number',
				default: 20,
				min: 1,
				max: 20
			},
			offset: {
				type: 'number',
				default: 0
			}
		});

		const goods = await db.goods.find(params)
			.skip(offset)
			.limit(limit)
			.sort({$natural: -1})
			.toArray();

		res.json({goods, total: goods.length});
	});

	app.get('/api/goods/:_id', async (req, res) => {
		const {_id} = validate(req, {
			_id: {
				type: 'number',
				required: true
			}
		});

		const good = await db.goods.findOne({_id});

		res.json(good);
	});

	app.delete('/api/goods/:_id', checkAdmin(), async (req, res) => {
		const {_id} = validate(req, {
			_id: {
				type: 'number',
				required: true
			}
		});

		await db.goods.deleteOne({_id});

		res.sendStatus(200);
	});

	app.post('/api/goods', checkAdmin(), async (req, res) => {
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
			price: {
				type: 'number',
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

	app.patch('/api/goods/:_id', checkAdmin(), async (req, res) => {
		const {_id, ...params} = validate(req, {
			_id: {
				type: 'number',
				required: true
			},
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
			price: {
				type: 'number',
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

		await db.goods.updateOne({_id}, {$set: params});

		res.sendStatus(200);
	});
};

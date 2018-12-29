const db = require('../../db');
const checkAdmin = require('../../middlewares/checkAdmin');
const validate = require('../../utils/validate');

module.exports = (app) => {
	app.get('/api/services', async (req, res) => {

		const services = await db.services.find().toArray();

		res.json({services, total: services.length});
	});

	app.get('/api/services/:_id', async (req, res) => {
		const {_id} = validate(req, {
			_id: {
				type: 'number',
				required: true
			}
		});

		const service = await db.services.findOne({_id});

		res.json(service);
	});

	app.delete('/api/services/:_id', checkAdmin(), async (req, res) => {
		const {_id} = validate(req, {
			_id: {
				type: 'number',
				required: true
			}
		});

		await db.services.deleteOne({_id});

		res.sendStatus(200);
	});

	app.post('/api/services', checkAdmin(), async (req, res) => {
		const params = validate(req, {
			name: {
				type: 'string',
				required: true,
				minLength: 1,
				maxLenth: 100
			},
			description: {
				type: 'string'
			},
			price: {
				type: 'number',
				required: true,
				minimum: 2,
				maximum: 20000
			}
		});

		await db.services.insertOne(params);

		res.sendStatus(200);
	});

	app.patch('/api/services/:_id', checkAdmin(), async (req, res) => {
		const {_id, ...params} = validate(req, {
			_id: {
				type: 'number',
				required: true
			},
			name: {
				type: 'string',
				required: true,
				minLength: 1,
				maxLenth: 100
			},
			description: {
				type: 'string'
			},
			price: {
				type: 'number',
				required: true,
				minimum: 2,
				maximum: 20000
			}
		});

		await db.services.updateOne({_id}, {$set: params});

		res.sendStatus(200);
	});
};

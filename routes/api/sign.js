const _ = require('underscore');
const crypto = require('crypto');
const config = require('../../config')();
const db = require('../../db');
const validate = require('../../utils/validate');

module.exports = function(app) {
	app.post('/api/signin', async (req, res) => {
		const {email, password} = validate(req, {
			email: {
				type: 'string',
				format: 'email',
				required: true,
				minLength: 3,
				maxLenth: 20
			},
			password: {
				type: 'string',
				required: true,
				minLength: 3,
				maxLenth: 20
			}
		});

		const user = await db.users.findOne({email});

		const passwordHash = crypto.createHmac('sha256', config.secretKey)
			.update(password)
			.digest('hex');

		if (!user || passwordHash !== user.password) {
			res.status(200).send('Wrong login/password');
		}

		res.cookie('login', user.type, {signed: true});
		res.send(req.signedCookies.login);
	});

	app.post('/api/signup', async (req, res) => {
		const params = validate(req, {
			secondName: {
				type: 'string',
				required: true,
				minLength: 1,
				maxLenth: 50
			},
			firstName: {
				type: 'string',
				required: true,
				minLength: 1,
				maxLenth: 50
			},
			email: {
				type: 'string',
				format: 'email',
				required: true,
				minLength: 3,
				maxLenth: 20
			},
			password: {
				type: 'string',
				required: true,
				minLength: 3,
				maxLenth: 20
			}
		});

		params.password = crypto.createHmac('sha256', config.secretKey)
			.update(params.password)
			.digest('hex');

		const user = await db.users.insertOne({...params, type: 'user'});

		res.send(_(user).omit('password'));
	});

	app.delete('/api/signout', (req, res) => {
		res.clearCookie('login');
		res.sendStatus(200);
	});
};

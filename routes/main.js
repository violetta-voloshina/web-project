const db = require('../db');

module.exports = function(app) {
	app.get('/signin',(req,res) =>{
		res.render('signin')
	})

	app.get('/form',(req,res) =>{
		res.render('form')
	})

	app.get('/service',async (req,res) =>{
		const services = await db.services.find().toArray();

		res.render('service')
	})

	app.get('/goods', async (req, res) => {
		const goods = await db.goods.find().toArray();

		res.render('goods', {goods});
	});

	app.get('*', (req, res) => {
		res.render('menu', {goods: []});
	})
}

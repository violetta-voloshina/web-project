module.exports = function(app) {
	app.get('/signin',(req,res) =>{
		res.render('form')
	})
	app.get('*', (req, res) => {
		res.render('menu');
	});
};

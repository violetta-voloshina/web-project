const _ = require('underscore');

module.exports = (app) => {
	_(['api', 'main']).each((file) => {
		require('./' + file)(app);
	});
};

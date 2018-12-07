const _ = require('underscore');

module.exports = (app) => {
	_(['goods', 'files']).each((file) => {
		require('./' + file)(app);
	});
};

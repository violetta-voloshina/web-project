const _ = require('underscore');

module.exports = (app) => {
	_(['goods', 'files', 'sign']).each((file) => {
		require('./' + file)(app);
	});
};

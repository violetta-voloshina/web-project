const _ = require('underscore');

module.exports = (app) => {
	_(['goods', 'files', 'sign', 'services']).each((file) => {
		require('./' + file)(app);
	});
};

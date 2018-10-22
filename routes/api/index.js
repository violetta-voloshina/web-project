const _ = require('underscore');

module.exports = function(app) {
	_(['goods']).each(function(file) {
		require('./' + file)(app);
	});
};

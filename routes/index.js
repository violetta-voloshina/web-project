const _ = require('underscore');

module.exports = function(app) {
	_(['main']).each(function(file) {
		require('./' + file)(app);
	});
};

const errors = require('../utils/errors');

module.exports = () => (req, res, next) => {
	if (req.signedCookies.login === 'admin') {
		return next();
	}

	throw new errors.UnauthorizedError();
};

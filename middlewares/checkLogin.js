const errors = require('../utils/errors');

module.exports = () => (req, res, next) => {
	if (req.signedCookies.login) {
		return next();
	}

	throw new errors.UnauthorizedError();
};

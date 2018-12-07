const React = require('react');
const {IndexRoute} = require('react-router');
const Main = require('./main');
const goodsRoutes = require('./goods/routes');

module.exports = (
	<React.Fragment>
		<IndexRoute components={Main} />
		{goodsRoutes}
	</React.Fragment>
);

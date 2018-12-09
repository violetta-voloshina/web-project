const React = require('react');
const {IndexRoute, Route} = require('react-router');
const Main = require('./main');
const goodsRoutes = require('./goods/routes');
const SignIn = require('./signin');
const Reg = require('./registation');

module.exports = (
	<React.Fragment>
		<IndexRoute components={Main} />
		{goodsRoutes}
		<Route component={SignIn} path="signin" />
		<Route component={Reg} path="registation" />
	</React.Fragment>
);

const React = require('react');
const {IndexRoute, Route} = require('react-router');
const Main = require('./main');
const servicesRoutes = require('./services/routes');
const goodsRoutes = require('./goods/routes');
const SignIn = require('app/components/SignIn');
const SignUp = require('app/components/SignUp');

module.exports = (
	<React.Fragment>
		<IndexRoute components={Main} />
		{servicesRoutes}
		{goodsRoutes}
		<Route component={SignIn} path="signin" />
		<Route component={SignUp} path="signup" />
	</React.Fragment>
);

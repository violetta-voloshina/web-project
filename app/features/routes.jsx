const React = require('react');
const {IndexRoute, Route} = require('react-router');
const Main = require('./main');
const goodsRoutes = require('./goods/routes');
const SignIn = require('app/components/SignIn');
const SignUp = require('app/components/SignUp');

module.exports = (
	<React.Fragment>
		<IndexRoute components={Main} />
		{goodsRoutes}
		<Route component={SignIn} path="signin" />
		<Route component={SignUp} path="signup" />
	</React.Fragment>
);

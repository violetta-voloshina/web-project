const React = require('react');
const {Route} = require('react-router');
const Layout = require('./features/layout/Layout');
const routes = require('./features/routes');

module.exports = (
	<Route components={Layout} path='/'>
		{routes}
	</Route>
);

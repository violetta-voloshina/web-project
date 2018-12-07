const React = require('react');
const {Route, IndexRoute} = require('react-router');
const List = require('./pages/list');
const Form = require('./pages/form');

module.exports = (
	<Route path="goods">
		<IndexRoute components={List} />
		<Route component={Form} path="add" />
	</Route>
);

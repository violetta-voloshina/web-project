const React = require('react');
const {Route, IndexRoute} = require('react-router');
const List = require('./pages/list/List');
const Form = require('./pages/form/Form');

module.exports = (
	<Route path="goods">
		<IndexRoute components={List} />
		<Route path="/edit/:id" component={Form} />
		<Route path="add" component={Form} />
	</Route>
);

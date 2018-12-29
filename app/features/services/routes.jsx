const React = require('react');
const {Route, IndexRoute} = require('react-router');
const List = require('./pages/list/List');
const AddForm = require('./pages/form/Add');
const EditForm = require('./pages/form/Edit');

module.exports = (
	<Route path="services">
		<IndexRoute components={List} />
		<Route component={AddForm} path="add" />
		<Route component={EditForm} path=":_id/edit" />
	</Route>
);

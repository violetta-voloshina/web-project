const React = require('react');

function Item({service}) {
	return (
		<h2>{service.name}</h2>
	);
}

module.exports = Item;

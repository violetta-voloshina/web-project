const React = require('react');
const PropTypes = require('prop-types');
const {withRouter} = require('react-router');
const Navbar = require('./Navbar');

function Layout({children}) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.element.isRequired
};

module.exports = withRouter(Layout);

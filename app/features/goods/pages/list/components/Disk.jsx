const React = require('react');
const PropTypes = require('prop-types');

function Disk({entity}) {
	return (
		<div
			style={{
				paddingRight: 5,
				paddingLeft: 20,
				paddingBlockEnd: 10,
				textAlign: 'left'
			}}
		>
			<div>Тип записи: {entity.typeRecord}</div>
		</div>
	);
}

Disk.propTypes = {
	entity: PropTypes.shape({
		typeRecord: PropTypes.string.isRequired
	}).isRequired
};

module.exports = Disk;

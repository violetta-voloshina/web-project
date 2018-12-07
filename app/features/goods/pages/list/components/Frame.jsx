const React = require('react');
const PropTypes = require('prop-types');


function Frame({entity}) {
	return (
		// <Card thumbnail='http://www.fresher.ru/wp-content/uploads/2018/03/1.jpg'
		// 	label={typesHash[good.type]}
		// 	heading={good.name}
		// 	description={good.description}
		// />
		<div
			style={{
				padding: 20
			}}
		>
			<div>Размер: {entity.size.width} x {entity.size.height}</div>
			<div>Материал: {entity.material}</div>
		</div>
	);
}

Frame.propTypes = {
	entity: PropTypes.shape({
		size: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}).isRequired,
		material: PropTypes.string.isRequired
	}).isRequired
};

module.exports = Frame;

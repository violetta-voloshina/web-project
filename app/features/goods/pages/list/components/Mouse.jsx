const React = require('react');
const PropTypes = require('prop-types');


function Mouse({entity}) {
	const Cord = entity.cord ? 'Проводная' : 'Беспроводная';
	return (
		<div
			style={{
				padding: 20
			}}
		>
			<div>Тип подключения: {Cord}</div>
			<div>Основной цвет: {entity.color}</div>
			<div>Производитель: {entity.manufacturer}</div>
		</div>
	);
}

Mouse.propTypes = {
	entity: PropTypes.shape({
		cord: PropTypes.bool.isRequired,
		manufacturer: PropTypes.string,
		color: PropTypes.string
	}).isRequired
};

module.exports = Mouse;

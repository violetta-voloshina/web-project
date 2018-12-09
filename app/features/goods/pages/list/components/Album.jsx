const React = require('react');
const PropTypes = require('prop-types');

function Album({entity}) {
	return (
		<div
			style={{
				padding: 20
			}}
		>
			<div>Размер размещаемой фотографии: {entity.sizePhoto.width} x {entity.sizePhoto.height}</div>
			<div>Тип листов: {entity.typeSheet} </div>
			<div>Количество листов: {entity.countSheet}</div>
		</div>
	);
}

Album.propTypes = {
	entity: PropTypes.shape({
		sizePhoto: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}).isRequired,
		typeSheet: PropTypes.string.isRequired,
		countSheet: PropTypes.number.isRequired
	}).isRequired
};

module.exports = Album;

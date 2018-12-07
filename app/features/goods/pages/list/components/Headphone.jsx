const React = require('react');
const PropTypes = require('prop-types');


function Headphone({entity}) {
	const Microphone = entity.microphone ? 'есть' : 'нет';
	const SpareCushions = entity.spareCushions ? 'есть' : 'нет';
	return (
		<div
			style={{
				padding: 20
			}}
		>
			<div>Микрофон: {Microphone}</div>
			<div>Доп. амбушюры: {SpareCushions}</div>
			<div>Основной цвет: {entity.color}</div>
			<div>Чуствительность: {entity.sensitivity} Дб</div>
			<div>Производитель: {entity.manufacturer}</div>
		</div>
	);
}

Headphone.propTypes = {
	entity: PropTypes.shape({
		spareCushions: PropTypes.bool.isRequired,
		microphone: PropTypes.bool.isRequired,
		color: PropTypes.string,
		sensitivity: PropTypes.number,
		manufacturer: PropTypes.string
	}).isRequired
};

module.exports = Headphone;

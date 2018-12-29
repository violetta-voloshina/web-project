const React = require('react');
const {Button, Card, CardImg, CardText, CardBody} = require('reactstrap');
const PropTypes = require('prop-types');

const typesHash = {
	frame: 'Рамка',
	headphone: 'Наушники',
	album: 'Альбом',
	mouse: 'Мышка'
};


function Item({good}) {
	console.log(`/uploads/${good.image.name}`);
	return (
		<Card
			style={{
				border: '2px outset gray'
			}}
		>
			<CardImg
				style={{
					width: 250
				}}
				top
				src={`/uploads/${good.image.name}`}
				alt="Card image cap"
			/>
			<CardBody
				style={{
					textAlign: 'center'
				}}
			>
				<h2>{typesHash[good.type]}</h2>
				<h4>{good.name}</h4>
				<CardText>{good.description}</CardText>
			</CardBody>
		</Card>
	);
}

Item.propTypes = {
	good: PropTypes.shape({
		image: PropTypes.shape({
			realName: PropTypes.string,
			name: PropTypes.string.isRequired
		}).isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		type: PropTypes.oneOf([
			'frame', 'album', 'headphone',
			'batterie', 'cord', 'mouse', 'disk'
		]).isRequired,
		frame: PropTypes.shape({
			size: PropTypes.shape({
				width: PropTypes.number.isRequired,
				height: PropTypes.number.isRequired
			}).isRequired,
			material: PropTypes.string.isRequired
		}),
		album: PropTypes.shape({
			sizePhoto: PropTypes.shape({
				width: PropTypes.number.isRequired,
				height: PropTypes.number.isRequired
			}).isRequired,
			typeSheet: PropTypes.string.isRequired,
			countSheet: PropTypes.number.isRequired
		}),
		headphone: PropTypes.shape({
			spareCushions: PropTypes.bool.isRequired,
			microphone: PropTypes.bool.isRequired,
			color: PropTypes.string,
			sensitivity: PropTypes.number,
			manufacturer: PropTypes.string
		}),
		batterie: PropTypes.shape({
			model: PropTypes.string.isRequired
		}),
		cord: PropTypes.shape({
			length: PropTypes.number.isRequired,
			entrance: PropTypes.string.isRequired,
			output: PropTypes.string.isRequired
		}),
		mouse: PropTypes.shape({
			cord: PropTypes.bool.isRequired,
			manufacturer: PropTypes.string,
			color: PropTypes.string
		}),
		disk: PropTypes.shape({
			typeRecord: PropTypes.string.isRequired
		})
	}).isRequired
};

module.exports = Item;

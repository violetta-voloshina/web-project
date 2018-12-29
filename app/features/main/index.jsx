const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const _ = require('underscore');
const Item = require('./Item');
const {Jumbotron} = require('reactstrap');
const {Carousel, Image} = require('react-bootstrap');

class Main extends React.Component {

	state = {
		frame: null,
		headphone: null,
		album: null,
		isSubmitting: true
	}

	async componentDidMount() {
		this.setState((state) => ({
			...state,
			isSubmitting: true
		}));

		await Promise.all(
			_(['frame', 'headphone', 'album']).map(async (type) => {
				const {data} = await axios.get(
					'/api/goods',
					{params: {type, limit: 1}}
				);

				this.setState({[type]: _(data.goods).first()});
			})
		);

		this.setState({isSubmitting: false});
}

	render() {

		if (this.state.isSubmitting) {
			return 'Загрузка';
		}

		const {frame, album, headphone} = this.state;

		return (
			<Jumbotron
				style={{
					margin: 20,
					padding: 20,
					textAlign: 'center'
				}}
			>
				<h1 className="display-3">Добро пожаловать в нашу ФотоСтудию!</h1>
				<p className="lead">
					Здесь вы можете ознакомиться с перечнем наших услуг и товаров.
				</p>
				<hr className="my-2" />
				<Carousel>
					<Carousel.Item>
						<Image
							width={900}
							height={500}
							alt="900x500"
							src={`/uploads/${frame.image.name}`}
						/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</Jumbotron>
		);
	}
}

module.exports = Main;

const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const _ = require('underscore');
const Item = require('./Item');
const {Jumbotron} = require('reactstrap');
const {Carousel, Image} = require('react-bootstrap');

class Main extends React.Component {

	state = {
		frames: [],
		headphones: [],
		albums: [],
		mouses: [],
		isSubmitting: false
	}

	componentDidMount() {
		this.setState((state) => ({
			...state,
			isSubmitting: true
		}));

		axios.get(
			'/api/goods/13'

		).then(({data}) => {
			this.setState({
				frames: data.frames,
				isSubmitting: false
			});
		});
	}

	render() {

		if (this.state.isSubmitting) {
			return 'Загрузка';
		}

		const {frames} = this.state;
		const {headphones} = this.state;
		const {albums} = this.state;
		const {mouses} = this.state;
		console.log(frames);
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
						<Image width={900} height={500} alt="900x500" src={`/uploads/${frames.image.name}`} />
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

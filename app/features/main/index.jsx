const React = require('react');
const axios = require('axios');
const _ = require('underscore');
const {Jumbotron} = require('reactstrap');
const {Button, Table, Image, Col, Row} = require('react-bootstrap');

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
			_(['frame', 'headphone', 'album', 'mouse', 'disk']).map(async (type) => {
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

		const {frame, album, headphone, mouse, disk} = this.state;

		return (
			<div
				style={{
					margin: 30,
					padding: 30
				}}
			>
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
				</Jumbotron>
				<Row className="show-grid">
					<Col sm={4}>
						<Image src={`/uploads/${frame.image.name}`} thumbnail />
					</Col>
					<Col sm={8}>
						<Jumbotron
							style={{
								margin: 20,
								padding: 20,
								textAlign: 'center'
							}}
						>
							<h3 className="display-3">
								В наличии имеется большой выбор рамочек стандартных размеров:
							</h3>
							<Table striped bordered condensed hover>
								<thead>
									<tr>
										<th
											style={{textAlign: 'center'}}
										>
											Ширина
										</th>
										<th
											style={{textAlign: 'center'}}
										>
											Высота
										</th>
										<th
											style={{textAlign: 'center'}}
										>
											Минимальная цена
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>10</td>
										<td>15</td>
										<td>65</td>
									</tr>
									<tr>
										<td>15</td>
										<td>21</td>
										<td>120</td>
									</tr>
									<tr>
										<td>21</td>
										<td>30</td>
										<td>170</td>
									</tr>
									<tr>
										<td>30</td>
										<td>40</td>
										<td>240</td>
									</tr>
								</tbody>
							</Table>
							<Button href="/goods?type=frame">Перейти к товарам</Button>
						</Jumbotron>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col sm={8}>
						<Jumbotron
							style={{
								margin: 20,
								padding: 20,
								textAlign: 'center'
							}}
						>
							<h3 className="display-3">В наличии имеютя альбомы:  </h3>
							<h4 className="display-3">детские, свадебные, семейные. </h4>
							<Button href="/goods?type=album">Перейти к товарам</Button>
						</Jumbotron>
					</Col>
					<Col sm={4}>
						<Image src={`/uploads/${album.image.name}`} thumbnail />
					</Col>
				</Row>
				<Row className="show-grid">
					<Col sm={4}>
						<Image src={`/uploads/${headphone.image.name}`} thumbnail />
					</Col>
					<Col sm={8}>
						<Jumbotron
							style={{
								margin: 20,
								padding: 20,
								textAlign: 'center'
							}}
						>
							<h3 className="display-3">В наличии имеютя наушники:  </h3>
							<h4 className="display-3">капельки, вкладышы, наушники для ПК. </h4>
							<Button href="/goods?type=headphone">Перейти к товарам</Button>
						</Jumbotron>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col sm={8}>
						<Jumbotron
							style={{
								margin: 20,
								padding: 20,
								textAlign: 'center'
							}}
						>
							<h3 className="display-3">В наличии имеютя мышки:  </h3>
							<h4 className="display-3">проводные,безпроводные. </h4>
							<h4 className="display-3">
								Также вы можете приобрести у нас коврик для мышки и батарейки.
							</h4>
							<Button href="/goods?type=mouse">Перейти к товарам</Button>
						</Jumbotron>
					</Col>
					<Col sm={4}>
						<Image src={`/uploads/${mouse.image.name}`} thumbnail />
					</Col>
				</Row>
				<Row className="show-grid">
					<Col sm={4}>
						<Image src={`/uploads/${disk.image.name}`} thumbnail />
					</Col>
					<Col sm={8}>
						<Jumbotron
							style={{
								margin: 20,
								padding: 20,
								textAlign: 'center'
							}}
						>
							<h3 className="display-3">В наличии имеютя диски:  </h3>
							<h4 className="display-3">CD, DVD. </h4>
							<Button href="/goods?type=disk">Перейти к товарам</Button>
						</Jumbotron>
					</Col>
				</Row>
			</div>
		);
	}
}

module.exports = Main;

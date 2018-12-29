const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const Item = require('./Item');
const _ = require('underscore');
const {ListGroup, ListGroupItem} = require('reactstrap');

class ServicesList extends React.Component {
	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.any.isRequired
		}).isRequired
	}
	state = {
		services: [],
		isSubmitting: false
	}

	componentDidMount() {
		this.setState((state) => ({
			...state,
			isSubmitting: true
		}));
		axios.get(
			'/api/services',
			{
				params: this.props.location.query
			}
		).then(({data}) => {
			this.setState({
				services: data.services,
				isSubmitting: false
			});
		});
	}

	onDeleteClick = (serviceId) => {
		axios.delete(`api/services/${serviceId}`).then(() => {
			// удалить из state услугу с _id = _id
			this.setState(({services, total}) => {
				const newServices = _(services).filter(({_id}) => _id !== serviceId);

				return {services: newServices, total: total - 1};
			});
		});
	}

	render() {
		if (this.state.isSubmitting) {
			return 'Загрузка';
		}

		const {services} = this.state;

		return (
			<ListGroup>
				<ListGroupItem
					style={{
						display: 'flex',
						textAlign: 'center',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginLeft: 10,
						marginRight: 10,
						border: 'none'
					}}
				>
					<h3>
						Название услуги
					</h3>
					<h3>Цена </h3>
				</ListGroupItem>
				{_(services).map((service) => (
					<Item
						key={service._id}
						service={service}
						onDeleteClick={_(this.onDeleteClick).partial(service._id)}
					/>
				))}
			</ListGroup>
		);
	}
}

module.exports = ServicesList;

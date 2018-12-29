const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const ServiceForm = require('./Form');

class EditForm extends React.Component {
	static propTypes = {
		params: PropTypes.shape({
			_id: PropTypes.string.isRequired
		}).isRequired
	}

	state= {
		service: null
	}

	componentDidMount() {
		axios.get(`/api/services/${this.props.params._id}`).then(
			({data}) => {
				this.setState({service: data});
			}
		);
	}

	render() {
		if (!this.state.service) {
			return <h1>Загрузка</h1>;
		}

		return (
			<ServiceForm
				header="Редактирование услуги"
				buttonName="Изменить"
				service={this.state.service}
				{...this.props}
			/>
		);
	}
}

module.exports = EditForm;

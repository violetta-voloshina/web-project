const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const GoodForm = require('./Form');

class EditForm extends React.Component {
	static propTypes = {
		params: PropTypes.shape({
			_id: PropTypes.string.isRequired
		}).isRequired
	}

	state= {
		good: null
	}

	componentDidMount() {
		axios.get(`/api/goods/${this.props.params._id}`).then(
			({data}) => {
				this.setState({good: data});
			}
		);
	}

	render() {
		if (!this.state.good) {
			return <h1>Загрузка</h1>;
		}

		return (
			<GoodForm
				header="Редактирование товара"
				buttonName="Изменить"
				good={this.state.good}
				{...this.props}
			/>
		);
	}
}

module.exports = EditForm;

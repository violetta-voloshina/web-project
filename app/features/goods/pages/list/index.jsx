const React = require('react');
const axios = require('axios');
const _ = require('underscore');
const Item = require('./components/Item');
const {Grid, Col} = require('react-bootstrap');

class GoodsList extends React.Component {
	state = {
		goods: [],
		isSubmitting: false
	}

	componentDidMount() {
		this.setState((state) => ({
			...state,
			isSubmitting: true
		}));

		axios.get('/api/goods').then(({data}) => {
			this.setState({
				goods: data.goods,
				isSubmitting: false
			});
		});
	}

	renderColumns = (columnsCount) => {
		const {goods} = this.state;
		const columns = _(columnsCount).times(() => []);

		_(goods).map((good, index) => {
			columns[index % columnsCount].push(<Item key={good._id} good={good} />);
		});

		return (
			<React.Fragment>
				{_(columns).map((column) => (
					<Col xs={4} md={3}>
						{column}
					</Col>
				))}
			</React.Fragment>
		);
	}

	render() {
		if (this.state.isSubmitting) {
			return 'Загрузка';
		}

		return (
			<Grid
				style={{
					display: 'flex',
					flexWrap: 'wrap'
				}}
			>
				{this.renderColumns(4)}
			</Grid>
		);
	}
}

module.exports = GoodsList;

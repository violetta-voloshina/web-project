const React = require('react');
const axios = require('axios');
const _ = require('underscore');
const Item = require('./components/Item');
const {Grid, Col} = require('react-bootstrap');
const PropTypes = require('prop-types');

class GoodsList extends React.Component {
	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.any.isRequired
		}).isRequired
	}
	state = {
		goods: [],
		isSubmitting: false
	}

	componentDidMount() {
		this.setState((state) => ({
			...state,
			isSubmitting: true
		}));
		axios.get(
			'/api/goods',
			{
				params: this.props.location.query
			}
		).then(({data}) => {
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
			columns[index % columnsCount].push(
				<Item
					key={good._id}
					good={good}
					onDeleteClick={_(this.onDeleteClick).partial(good._id)}
				/>
			);
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

	onDeleteClick = (goodId) => {
		axios.delete(`api/goods/${goodId}`).then(() => {
			// удалить из state товаров с _id = _id
			this.setState(({goods, total}) => {
				const newGoods = _(goods).filter(({_id}) => _id !== goodId);

				return {goods: newGoods, total: total - 1};
			});
		});
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

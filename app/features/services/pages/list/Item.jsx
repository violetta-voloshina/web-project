const React = require('react');
const {ListGroupItem, Button, Collapse, Card, CardBody} = require('reactstrap');
const PropTypes = require('prop-types');
const Link = require('react-router').Link;

class Item extends React.Component {
	static propTypes = {
		onDeleteClick: PropTypes.func.isRequired
	}

	state = {
		isCollapseOpen: false
	}

	toggle = () => {
		this.setState(({isCollapseOpen}) => ({isCollapseOpen: !isCollapseOpen}));
	}

	render() {
		const isAdmin = /admin/.test(document.cookie.replace(
			// eslint-disable-next-line no-useless-escape
			/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/,
			'$1'
		));
		const {service} = this.props;
		return (
			<div
				style={{
					marginLeft: 10,
					marginRight: 10,
					marginTop: 14
				}}
			>
				<ListGroupItem
					style={{
						display: 'flex',
						textAlign: 'center',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingTop: 1,
						paddingBottom: 1
					}}
				>
					<h4>{service.name}</h4>
					<h4>{service.price} руб.</h4>
				</ListGroupItem>
				<Button
					onClick={this.toggle}
					style={{marginBottom: '1rem', margin: 3}}
				>
					Показать подробное описание услуги
				</Button>
				<Collapse isOpen={this.state.isCollapseOpen}>
					<Card
						style={{
							marginLeft: 10,
							marginRight: 10
						}}
					>
						<CardBody>
							<h4>{service.description}</h4>
						</CardBody>
					</Card>
				</Collapse>
				{isAdmin && (
					<Link to={`/services/${service._id}/edit`} style={{paddingLeft: 24}}>
						<Button>Изменить услугу</Button>
					</Link>
				)}
				{isAdmin && (
					<Button
						style={{
							marginLeft: 10,
							marginRight: 10
						}}
						type='submit'
						onClick={this.props.onDeleteClick}
					>
						Удалить услугу
					</Button>
				)}
			</div>
		);
	}
}

Item.propTypes = {
	service: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		price: PropTypes.number.isRequired
	}).isRequired
};

module.exports = Item;

const React = require('react');
const {
	Navbar,
	NavDropdown,
	MenuItem,
	Nav,
	NavItem,
	Button,
	Glyphicon
} = require('react-bootstrap');
const axios = require('axios');

class NavbarWrapper extends React.Component {
	state = {
		signIn: false,
		isAdmin: false
	};

	componentDidMount() {
		this.setState({
			signIn: document.cookie.replace(
				// eslint-disable-next-line no-useless-escape
				/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/,
				'$1'
			),
			isAdmin: /admin/.test(document.cookie.replace(
				// eslint-disable-next-line no-useless-escape
				/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/,
				'$1'
			))
		});
	}

	onExitClick = () => {
		axios.delete('/api/signout').then(() => {
			this.setState({
				signIn: false,
				isAdmin: false
			});
		});
	}

	render() {
		return (
			<Navbar
				inverse
				collapseOnSelect
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">PhotoStudio</a>
					</Navbar.Brand>
					<Nav>
						<NavDropdown eventKey={3} title="Товары" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1} href="/goods">Все товары</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.1} href="/goods?type=frame">Рамки</MenuItem>
							<MenuItem eventKey={3.2} href="/goods?type=album">Альбомы</MenuItem>
							<MenuItem eventKey={3.3} href="/goods?type=headphone">Наушники</MenuItem>
							<MenuItem eventKey={3.3} href="/goods?type=mouse">Мышки</MenuItem>
						</NavDropdown>
						<NavItem eventKey={1} href="/services">
							Услуги
						</NavItem>
						<NavItem eventKey={1} href="/services">
							Контактные данные
						</NavItem>
					</Nav>
				</Navbar.Header>
				<Navbar.Collapse>
					<Navbar.Form pullRight>
						{this.state.isAdmin && (
							<Button
								href='/goods/add'
								bsStyle="primary"
							>
								<Glyphicon glyph="edit" />
								Добавить товар
							</Button>
						)}
						{this.state.isAdmin && (
							<Button
								href='/services/add'
								bsStyle="primary"
							>
								<Glyphicon glyph="edit" />
								Добавить услугу
							</Button>
						)}
						{this.state.signIn ? (
							<Button
								bsStyle="primary"
								onClick={this.onExitClick}
								style={{marginLeft: 10}}
							>
								Выйти
							</Button>
						) : (
							<Button href='/signin' bsStyle="primary" style={{marginLeft: 10}}>
								Войти
							</Button>
						)}
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

module.exports = NavbarWrapper;

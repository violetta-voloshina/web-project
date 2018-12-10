const React = require('react');
const {
	Navbar,
	NavDropdown,
	MenuItem,
	Nav,
	NavItem,
	FormGroup,
	Button,
	FormControl
} = require('react-bootstrap');

function NavbarWrapper() {
	const signIn = document.cookie.replace(
		// eslint-disable-next-line no-useless-escape
		/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/,
		'$1'
	);

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
						<MenuItem eventKey={3.1} href="/goods?type=frame">Рамки</MenuItem>
						<MenuItem eventKey={3.2} href="/goods?type=album">Альбомы</MenuItem>
						<MenuItem eventKey={3.3}>Диски</MenuItem>
						<MenuItem eventKey={3.3} href="/goods?type=headphone">Наушники</MenuItem>
						<MenuItem eventKey={3.3} href="/goods?type=mouse">Мышки</MenuItem>
					</NavDropdown>
					<NavItem eventKey={1} href="#">
						Услуги
					</NavItem>
				</Nav>
			</Navbar.Header>
			<Navbar.Collapse>
				<Navbar.Form pullRight>
					<FormGroup>
						<FormControl type="text" placeholder="Search" />
					</FormGroup>
					<Button bsStyle="primary">
						Поиск
					</Button>
					{!signIn && (
						<Button href='/signin' bsStyle="primary" style={{marginLeft: 10}}>
							Войти
						</Button>
					)}
				</Navbar.Form>
			</Navbar.Collapse>
		</Navbar>
	);
}

module.exports = NavbarWrapper;

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
	return (
		<Navbar
			inverse
			collapseOnSelect
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'center'
			}}
		>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/">PhotoStudio</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavDropdown eventKey={3} title="Товары" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Рамки</MenuItem>
						<MenuItem eventKey={3.2}>Альбомы</MenuItem>
						<MenuItem eventKey={3.3}>Диски</MenuItem>
						<MenuItem eventKey={3.3}>Наушники</MenuItem>
					</NavDropdown>
					<NavItem eventKey={1} href="#">
						Услуги
					</NavItem>
				</Nav>
				<Nav pullRight style={{display: 'flex'}}>
					<Navbar.Form pullLeft>
						<FormGroup>
							<FormControl type="text" placeholder="Search" />
						</FormGroup>
						<Button bsStyle="primary" bsSize="default">
							Поиск
						</Button>
						<Button bsStyle="primary" bsSize="default" style={{marginLeft: 10}}>
							Войти
						</Button>
					</Navbar.Form>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

module.exports = NavbarWrapper;

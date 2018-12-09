const React = require('react');
const {Button, Glyphicon} = require('react-bootstrap');
function Main() {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					paddingRight: '7%'
				}}
			>
				<Button
					bsSize="large"
					href='/goods/add'
				>
					<Glyphicon glyph="edit" />
					 Добавить товар
				</Button>
			</div>
			<div>
				Это главная страница.
			</div>
		</div>
	);
}

module.exports = Main;

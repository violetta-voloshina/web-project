const React = require('react');
const {Button, Box, Glyphicon} = require('react-bootstrap');
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
				Это твоя главная страница.
				Она будет загружаться, когда ты перейдешь на главную.
				Здесь ты можешь все хардкодить.
			</div>
		</div>
	);
}

module.exports = Main;

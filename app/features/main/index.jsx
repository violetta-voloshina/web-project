const React = require('react');
const {Button, Glyphicon} = require('react-bootstrap');

function Main() {
	const isAdmin = /admin/.test(document.cookie.replace(
		// eslint-disable-next-line no-useless-escape
		/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/,
		'$1'
	));

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					paddingRight: '7%'
				}}
			>
				{isAdmin && (
					<Button
						bsSize="large"
						href='/goods/add'
					>
						<Glyphicon glyph="edit" />
						Добавить товар
					</Button>
				)}
			</div>
		</div>
	);
}

module.exports = Main;

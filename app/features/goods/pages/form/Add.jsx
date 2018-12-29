const React = require('react');
const GoodForm = require('./Form');

function AddForm(props) {
	return (
		<GoodForm
			header="Создание товара"
			buttonName="Добавить"
			{...props}
		/>
	);
}

module.exports = AddForm;

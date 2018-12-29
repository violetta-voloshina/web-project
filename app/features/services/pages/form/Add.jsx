const React = require('react');
const ServiceForm = require('./Form');

function AddForm(props) {
	return (
		<ServiceForm
			header="Создание услуги"
			buttonName="Добавить"
			{...props}
		/>
	);
}

module.exports = AddForm;

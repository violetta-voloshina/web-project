const React = require('react');
const PropTypes = require('prop-types');


class MouseForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}

	static defaultProps = {
		errors: {}
	}

	onManufacturerChange = ({target}) => {
		this.props.onChange('manufacturer', target.value)
	}

	onСolorChange = ({target}) => {
		this.props.onChange('color', target.value)
	}

	onСordChange= () => {
		this.props.onChange(
			'cord',
			!this.props.values.cord
		);
	}

	render() {
		const {values, errors} = this.props;

		return (
			<React.Fragment>
				<FormField label="Основной цвет" error={errors.color}>
					<TextInput
						name="color"
						placeholder="Основной цвет"
						value={values.color}
						onDOMChange={this.onСolorChange}
					/>
				</FormField>

				<FormField label="Проводная/безпроводная" error={errors.cord}>
					<CheckBox
						label="Наличие шнура"
						checked={values.cord}
						name='cord'
						onChange={this.onСordChange}
					/>
				</FormField>

				<FormField label="Производитель" error={errors.manufacturer}>
					<TextInput
						name="manufacturer"
						placeholder="Тип материала"
						value={values.manufacturer}
						onDOMChange={this.onManufacturerChange}
					/>
				</FormField>
			</React.Fragment>
		);
	}
}

module.exports = MouseForm;

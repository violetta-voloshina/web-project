const React = require('react');
const PropTypes = require('prop-types');


class BatterieForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}

	static defaultProps = {
		errors: {}
	}

	onModelChange = ({target}) => {
		this.props.onChange('model', target.value)
	}

	render() {
		const {values, errors} = this.props;

		return (
			<React.Fragment>
				<FormField label="Модель" error={errors.model}>
					<TextInput
						name="model"
						placeholder="Модель"
						value={values.model}
						onDOMChange={this.onModelChange}
					/>
				</FormField>
			</React.Fragment>
		)
	}
}

module.exports = BatterieForm;

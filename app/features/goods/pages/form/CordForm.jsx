const React = require('react');
const PropTypes = require('prop-types');


class CordForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}

	static defaultProps = {
		errors: {}
	}

	onLengthChange = ({target}) => {
		this.props.onChange('length', target.value)
	}

	onEntranceChange = ({target}) => {
		this.props.onChange('entrance', target.value)
	}

	onOutputChange = ({target}) => {
		this.props.onChange('output', target.value)
	}

	render() {
		const {values, errors} = this.props;

		return (
			<React.Fragment>
				<FormField label="Длина" error={errors.length}>
					<NumberInput
						name="length"
						max={100}
						min={1}
						value={values.length}
						onChange={this.onLengthChange}
					/>
				</FormField>

				<FormField label="Тип входа" error={errors.entrance}>
					<TextInput
						name="entrance"
						placeholder="Тип входа"
						value={values.entrance}
						onDOMChange={this.onEntranceChange}
					/>
				</FormField>

				<FormField label="Тип выхода" error={errors.output}>
					<TextInput
						name="output"
						placeholder="Тип выхода"
						value={values.output}
						onDOMChange={this.onOutputChange}
					/>
				</FormField>
			</React.Fragment>
		);
	}
}

module.exports = CordForm;

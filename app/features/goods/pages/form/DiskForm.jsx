const React = require('react');
const PropTypes = require('prop-types');


class DiskForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}

	static defaultProps = {
		errors: {}
	}

	onTypeRecordChange = ({target}) => {
		this.props.onChange('typeRecord', target.value)
	}

	render() {
		const {values, errors} = this.props;

		return (
			<React.Fragment>
				<FormField label="Тип записи" error={errors.typeRecord}>
					<TextInput
						name="typeRecord"
						placeholder="Тип записи"
						value={values.typeRecord}
						onDOMChange={this.onTypeRecordChange}
					/>
				</FormField>
			</React.Fragment>
		);
	}
}

module.exports = DiskForm;

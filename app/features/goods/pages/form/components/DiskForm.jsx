const React = require('react');
const PropTypes = require('prop-types');
const {
	Label
} = require('reactstrap');
const {
	FormGroup, FormControl, ControlLabel
} = require('react-bootstrap');
class DiskForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any
	}

	static defaultProps = {
		values: {},
		errors: {}
	}

	onTypeRecordChange = ({target}) => {
		this.props.onChange('typeRecord', target.value);
	}

	render() {
		const {values, errors} = this.props;

		return (
			<FormGroup validationState={errors.typeRecord ? 'error' : 'success'}>
				<Label>Тип записи</Label>
				<FormControl
					type="text"
					name="typeRecord"
					placeholder="Тип записи"
					value={values.typeRecord || ''}
					onChange={this.onTypeRecordChange}
				/>
				<ControlLabel
					style={{
						textAlign: 'left'
					}}
				>
					{errors.typeRecord && 'Введите тип записи'}
				</ControlLabel>
			</FormGroup>
		);
	}
}

module.exports = DiskForm;

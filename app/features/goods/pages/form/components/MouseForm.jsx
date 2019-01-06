const React = require('react');
const PropTypes = require('prop-types');
const {
	Label
} = require('reactstrap');
const {
	FormGroup, FormControl, ControlLabel, Checkbox
} = require('react-bootstrap');
class MouseForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any
	}

	static defaultProps = {
		values: {},
		errors: {}
	}

	onCordChange = () => {
		this.props.onChange(
			'cord',
			!this.props.values.cord
		);
	}

	onColorChange = ({target}) => {
		this.props.onChange('color', target.value);
	}

	onManufacturerChange = ({target}) => {
		this.props.onChange('manufacturer', target.value);
	}

	render() {
		const {values, errors} = this.props;

		return (
			<React.Fragment>
				<FormGroup validationState={errors.color ? 'error' : 'success'}>
					<Label>Основной цвет</Label>
					<FormControl
						type="text"
						name="color"
						placeholder="Основной цвет"
						value={values.color}
						onChange={this.onColorChange}
					/>
				</FormGroup>

				<FormGroup validationState={errors.cord ? 'error' : 'success'}>
					<Label>Проводная/безпроводная</Label>
					<Checkbox
						checked={values.cord || ''}
						name='cord'
						onChange={this.onCordChange}
					>
						Проводная/безпроводная
					</Checkbox>
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.cord && 'Выберите есть ли шнур'}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.manufacturer ? 'error' : 'success'}>
					<Label>Производитель</Label>
					<FormControl
						type="text"
						name="manufacturer"
						placeholder="Тип материала"
						value={values.manufacturer || ''}
						onChange={this.onManufacturerChange}
					/>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = MouseForm;

const React = require('react');
const PropTypes = require('prop-types');
const {
	Input, FormGroup, Label, FormText
} = require('reactstrap');
const {
	Checkbox
} = require('react-bootstrap');

class HeadphoneForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any
	}

	static defaultProps = {
		values: {
			sensitivity: 80
		},
		errors: {}
	}

	onCushionsChange = () => {
		this.props.onChange(
			'spareCushions',
			!this.props.values.spareCushions
		);
	}

	onMicrophoneChange= () => {
		this.props.onChange(
			'microphone',
			!this.props.values.microphone
		);
	}

	onManufacturerChange = ({target}) => {
		this.props.onChange('manufacturer', target.value);
	}

	onSensitivityChange = ({target}) => {
		this.props.onChange('sensitivity', target.value);
	}

	onColorChange = ({target}) => {
		this.props.onChange('color', target.value);
	}

	render() {
		const {values, errors} = this.props;
		console.log(values);
		return (
			<React.Fragment>
				<FormGroup error={errors.spareCushions}>
					<Label>Наличие доп. амбюшур</Label>
					<Checkbox
						checked={values.spareCushions}
						name='spareCushions'
						onChange={this.onCushionsChange}
					>
						Наличие доп. амбюшур
					</Checkbox>
				</FormGroup>
				<FormGroup error={errors.microphone}>
					<Label>Наличие микрофона</Label>
					<Checkbox
						checked={values.microphone}
						name='microphone'
						onChange={this.onMicrophoneChange}
					>
						Наличие микрофона
					</Checkbox>
				</FormGroup>
				<FormGroup error={errors.color}>
					<Label>Основной цвет</Label>
					<Input
						type="text"
						name="color"
						placeholder="Основной цвет"
						value={values.color}
						onChange={this.onColorChange}
					/>
				</FormGroup>

				<FormGroup error={errors.sensitivity}>
					<Label>Чуствительность</Label>
					<Input
						type="number"
						name="sensitivity"
						max="300"
						min="80"
						value={values.sensitivity}
						onChange={this.onSensitivityChange}
					/>
					<FormText color="muted">
						Значение не должно быть больше 300 и меньше 80
					</FormText>
				</FormGroup>

				<FormGroup label="Производитель" error={errors.manufacturer}>
					<Label>Производитель</Label>
					<Input
						type="text"
						name="manufacturer"
						placeholder="Производитель"
						value={values.manufacturer}
						onChange={this.onManufacturerChange}
					/>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = HeadphoneForm;

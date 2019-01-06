const React = require('react');
const PropTypes = require('prop-types');
const {
	Label
} = require('reactstrap');
const {
	FormGroup, FormControl, ControlLabel, Checkbox
} = require('react-bootstrap');
class HeadphoneForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any
	}

	static defaultProps = {
		values: {},
		errors: {}
	}

	onCushionsChange = () => {
		this.props.onChange('spareCushions', !this.props.values.spareCushions);
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
		return (
			<React.Fragment>
				<FormGroup validationState={errors.spareCushions ? 'error' : 'success'}>
					<Label>Наличие доп. амбюшур</Label>
					<Checkbox
						checked={values.spareCushions || ''}
						name='spareCushions'
						onChange={this.onCushionsChange}
					>
						Наличие доп. амбюшур
					</Checkbox>
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.spareCushions && 'Выберите есть ли доп. амбюшуры'}
					</ControlLabel>
				</FormGroup>
				<FormGroup validationState={errors.microphone ? 'error' : 'success'}>
					<Label>Наличие микрофона</Label>
					<Checkbox
						checked={values.microphone || ''}
						name='microphone'
						onChange={this.onMicrophoneChange}
					>
						Наличие микрофона
					</Checkbox>
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.microphone && 'Выберите есть ли микрофон'}
					</ControlLabel>
				</FormGroup>
				<FormGroup validationState={errors.color ? 'error' : 'success'}>
					<Label>Основной цвет</Label>
					<FormControl
						type="text"
						name="color"
						placeholder="Основной цвет"
						value={values.color || ''}
						onChange={this.onColorChange}
					/>
				</FormGroup>

				<FormGroup validationState={errors.sensitivity ? 'error' : 'success'}>
					<Label>Чуствительность</Label>
					<FormControl
						type="number"
						name="sensitivity"
						max={300}
						min={80}
						value={values.sensitivity || ''}
						onChange={this.onSensitivityChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.sensitivity && 'Введите значение от 80 до 300'}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.manufacturer ? 'error' : 'success'}>
					<Label>Производитель</Label>
					<FormControl
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

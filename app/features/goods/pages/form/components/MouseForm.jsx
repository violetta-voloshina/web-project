const React = require('react');
const PropTypes = require('prop-types');
const {Input, FormGroup, Label} = require('reactstrap');
const {Checkbox} = require('react-bootstrap');

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

				<FormGroup error={errors.cord}>
					<Label>Проводная/безпроводная</Label>
					<Checkbox
						checked={values.cord || ''}
						name='cord'
						onChange={this.onCordChange}
					/>
				</FormGroup>

				<FormGroup label="Производитель" error={errors.manufacturer}>
					<Label>Производитель</Label>
					<Input
						type="text"
						name="manufacturer"
						placeholder="Производитель"
						value={values.manufacturer || ''}
						onChange={this.onManufacturerChange}
					/>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = MouseForm;

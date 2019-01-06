const React = require('react');
const PropTypes = require('prop-types');
const yup = require('app/utils/yup');
const {withFormik} = require('formik');
const {
	Input, Label
} = require('reactstrap');
const {
	FormGroup, FormControl, ControlLabel
} = require('react-bootstrap');
class FrameForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any
	}

	static defaultProps = {
		values: {
			size:
			{
				height: 0,
				width: 0
			},
			material: ''
		},
		errors: {
			size:
			{
				height: '',
				width: ''
			},
			material: ''
		}
	}

	onWidthChange = ({target}) => {
		this.props.onChange('size', {
			...this.props.values.size,
			width: Number(target.value)
		});
	};

	onHeightChange = ({target}) => {
		this.props.onChange('size', {
			...this.props.values.size,
			height: Number(target.value)
		});
	}

	onMaterialChange = ({target}) => {
		this.props.onChange('material', target.value);
	}

	render() {
		const {values, errors} = this.props;
		const {size, material} = values;
		return (
			<React.Fragment>
				<FormGroup validationState={errors.size && errors.size.height ? 'error' : 'success'}>
					<Label>Высота рамки</Label>
					<FormControl
						name="height"
						type="number"
						max={60}
						min={1}
						placeholder="Высота рамки"
						step="1"
						value={size && size.height || ''}
						onChange={this.onHeightChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.size && errors.size.height &&
							(errors.size.height === 'entity.size.height is a required field' ?
								'Введите высоту рамки' :
								'Введите значение от 1 до 60'
							)
						}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.size && errors.size.width ? 'error' : 'success'}>
					<Label>Ширина рамки</Label>
					<FormControl
						name="width"
						type="number"
						max={60}
						min={1}
						placeholder="Ширина рамки"
						step="1"
						value={size && size.width || ''}
						onChange={this.onWidthChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.size && errors.size.width &&
							(errors.size.width === 'entity.size.width is a required field' ?
								'Введите ширину рамки' :
								'Введите значение от 1 до 60'
							)
						}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.material ? 'error' : 'success'}>
					<Label>Тип материала</Label>
					<FormControl
						name="material"
						type="text"
						placeholder="Тип материала"
						value={material || ''}
						onChange={this.onMaterialChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.material && 'Введите тип материала'}
					</ControlLabel>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = FrameForm;

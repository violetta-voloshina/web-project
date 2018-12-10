const React = require('react');
const PropTypes = require('prop-types');
const {Input, FormGroup, Label} = require('reactstrap');

class FrameForm extends React.Component {
	static propTypes = {
		errors: PropTypes.any,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.any
	}

	static defaultProps = {
		values: {},
		errors: {}
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
				<FormGroup error={errors.size && errors.size.height}>
					<Label>Высота рамки</Label>
					<Input
						bsSize="lg"
						name="height"
						type="number"
						placeholder="Высота рамки"
						step="1"
						value={size && size.height || ''}
						onChange={this.onHeightChange}
					/>
				</FormGroup>

				<FormGroup error={errors.size && errors.size.width}>
					<Label>Ширина рамки</Label>
					<Input
						bsSize="lg"
						name="width"
						type="number"
						placeholder="Ширина рамки"
						step="1"
						value={size && size.width || ''}
						onChange={this.onWidthChange}
					/>
				</FormGroup>

				<FormGroup error={errors.material}>
					<Label>Тип материала</Label>
					<Input
						bsSize="lg"
						name="material"
						type="text"
						placeholder="Тип материала"
						value={material || ''}
						onChange={this.onMaterialChange}
					/>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = FrameForm;

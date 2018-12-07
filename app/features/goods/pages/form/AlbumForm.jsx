const React = require('react');
const PropTypes = require('prop-types');
const {
	Input, FormGroup, Label
} = require('reactstrap');

class AlbumForm extends React.Component {
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
		this.props.onChange('sizePhoto', {
			...this.props.values.sizePhoto,
			width: Number(target.value)
		});
	};

	onHeightChange = ({target}) => {
		this.props.onChange('sizePhoto', {
			...this.props.values.sizePhoto,
			height: Number(target.value)
		});
	}

	ontypeSheetChange = ({target}) => {
		this.props.onChange('typeSheet', target.value);
	}

	oncountSheetChange = ({target}) => {
		this.props.onChange('countSheet', Number(target.value));
	}

	render() {
		const {values, errors} = this.props;
		const {sizePhoto} = values;

		return (
			<React.Fragment>
				<FormGroup error={errors.size && errors.size.height}>
					<Label>Высота фотографии</Label>
					<Input
						type="number"
						name="height"
						max={60}
						min={2}
						value={sizePhoto && sizePhoto.height || ''}
						onChange={this.onHeightChange}
					/>
				</FormGroup>

				<FormGroup error={errors.size && errors.size.width}>
					<Label>Ширина фотографии</Label>
					<Input
						type="number"
						name="width"
						max="60"
						min="2"
						value={sizePhoto && sizePhoto.width || ''}
						onChange={this.onWidthChange}
					/>
				</FormGroup>

				<FormGroup error={errors.typeSheet}>
					<Label>Тип страниц</Label>
					<Input
						type="text"
						name="typeSheet"
						placeholder="Тип материала"
						value={values.typeSheet}
						onChange={this.ontypeSheetChange}
					/>
				</FormGroup>

				<FormGroup error={errors.countSheet}>
					<Label>Число страниц</Label>
					<Input
						type="number"
						name="countSheet"
						max="4000"
						min="10"
						value={values.countSheet}
						onChange={this.oncountSheetChange}
					/>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = AlbumForm;

const React = require('react');
const PropTypes = require('prop-types');
const {
	Label
} = require('reactstrap');
const {
	FormGroup, FormControl, ControlLabel
} = require('react-bootstrap');

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

	onTypeSheetChange = ({target}) => {
		this.props.onChange('typeSheet', target.value);
	}

	onCountSheetChange = ({target}) => {
		this.props.onChange('countSheet', Number(target.value));
	}

	render() {
		const {values, errors} = this.props;
		const {sizePhoto} = values;

		return (
			<React.Fragment>
				<FormGroup validationState={errors.sizePhoto && errors.sizePhoto.height ? 'error' : 'success'}>
					<Label>Высота фотографии</Label>
					<FormControl
						type="number"
						name="height"
						max={60}
						min={2}
						value={sizePhoto && sizePhoto.height || ''}
						onChange={this.onHeightChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.sizePhoto && errors.sizePhoto.height &&
							(errors.sizePhoto.height === 'entity.sizePhoto.height is a required field' ?
								'Введите высоту рамки' :
								'Введите значение от 1 до 60'
							)
						}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.sizePhoto && errors.sizePhoto.width ? 'error' : 'success'}>
					<Label>Ширина фотографии</Label>
					<FormControl
						type="number"
						name="width"
						max={60}
						min={2}
						value={sizePhoto && sizePhoto.width || ''}
						onChange={this.onWidthChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.sizePhoto && errors.sizePhoto.width &&
							(errors.sizePhoto.width === 'entity.sizePhoto.width is a required field' ?
								'Введите ширину рамки' :
								'Введите значение от 1 до 60'
							)
						}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.typeSheet ? 'error' : 'success'}>
					<Label>Тип страниц</Label>
					<FormControl
						type="text"
						name="typeSheet"
						placeholder="Тип материала"
						value={values.typeSheet}
						onChange={this.onTypeSheetChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.typeSheet && 'Введите тип страниц'}
					</ControlLabel>
				</FormGroup>

				<FormGroup validationState={errors.countSheet ? 'error' : 'success'}>
					<Label>Число страниц</Label>
					<FormControl
						type="number"
						name="countSheet"
						max={4000}
						min={10}
						value={values.countSheet}
						onChange={this.onCountSheetChange}
					/>
					<FormControl.Feedback />
					<ControlLabel
						style={{
							textAlign: 'left'
						}}
					>
						{errors.countSheet &&
							(errors.countSheet === 'entity.countSheet is a required field' ?
								'Введите число страниц' :
								'Введите значение от 10 до 4000'
							)
						}
					</ControlLabel>
				</FormGroup>
			</React.Fragment>
		);
	}
}

module.exports = AlbumForm;

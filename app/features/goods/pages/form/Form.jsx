const _ = require('underscore');
const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {
	Button, Form, FormGroup, FormControl, ControlLabel
} = require('react-bootstrap');
const {
	Label
} = require('reactstrap');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const {uploadImage} = require('app/utils/uploads');
const FrameForm = require('./components/FrameForm');
const AlbumForm = require('./components/AlbumForm');
const HeadphoneForm = require('./components/HeadphoneForm');
const MouseForm = require('./components/MouseForm');
const DiskForm = require('./components/DiskForm');

const formsHash = {
	album: AlbumForm,
	frame: FrameForm,
	headphone: HeadphoneForm,
	mouse: MouseForm,
	disk: DiskForm
};

class GoodForm extends React.Component {

	static propTypes = {
		errors: PropTypes.any.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		setFieldValue: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired,
		header: PropTypes.string.isRequired,
		buttonName: PropTypes.string.isRequired
	}

	onImageChange = ({currentTarget}) => {
		const file = _(currentTarget.files).first();
		this.props.setFieldValue('image', {file});
	}

	onGoodChange = (name, value) => {
		const {values} = this.props;

		this.props.setFieldValue('entity', {
			...values.entity,
			[name]: value
		});
	}

	onTypeChange = ({currentTarget}) => {
		this.props.setFieldValue('type', currentTarget.value);
		this.props.setFieldValue('entity', {});
	}

	render() {
		const {values, handleChange, errors} = this.props;
		const FormComponent = formsHash[values.type];
		return (
			<div>
				<div
					style={{
						textAlign: 'center',
						paddingBottom: '9px',
						margin: '40px 0 20px',
						borderBottom: '1px solid #eee'
					}}
				>
					<h1>{this.props.header}</h1>
				</div>
				<Form
					style={{
						paddingRight: 80,
						paddingLeft: 80,
						paddingTop: 0
					}}
				>
					<FormGroup validationState={errors.image ? 'error' : 'success'}>
						<Label for="exampleFile">Выберите файл</Label>
						<FormControl type="file" name="image" onChange={this.onImageChange} />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.image && 'Выберите изображение'}
						</ControlLabel>
					</FormGroup>
					<FormGroup validationState={errors.name ? 'error' : 'success'}>
						<Label for="exampleFile">Название товара</Label>
						<FormControl
							name="name"
							type="text"
							placeholder="Название товара"
							value={values.name}
							onChange={handleChange}
						/>
						<FormControl.Feedback />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.name && 'Введите название товара'}
						</ControlLabel>
					</FormGroup>

					<FormGroup validationState={errors.type ? 'error' : 'success'}>
						<Label>Тип товара</Label>
						<FormControl
							componentClass="select"
							onChange={this.onTypeChange}
							value={values.type}
							name="type"
						>
							<option value="frame">Рамка</option>
							<option value="album">Альбом</option>
							<option value='headphone'>Наушники</option>
							<option value='mouse'>Мышь</option>
							<option value='disk'>Диск</option>
						</FormControl>
					</FormGroup>
					<FormComponent
						values={values.entity}
						onChange={this.onGoodChange}
						errors={errors.entity}
					/>
					<FormGroup validationState={errors.price ? 'error' : 'success'}>
						<Label>Цена на товар</Label>
						<FormControl
							name="price"
							type="number"
							max={20000}
							min={2}
							placeholder="Цена на товар"
							step="1"
							value={values.price}
							onChange={handleChange}
						/>
						<FormControl.Feedback />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.price &&
									(errors.price === 'price is a required field' ?
										'Введите цену товара' :
										'Введите значение от 2 до 20000'
									)
							}
						</ControlLabel>
					</FormGroup>
					<FormGroup
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<Button
							href="/"
							style={{
								background: 'gray',
								color: 'white',
								borderRadius: '1em'
							}}
						>
							Вернуться
						</Button>
						<Button
							type='submit'
							style={{
								background: 'gray',
								color: 'white',
								borderRadius: '1em'
							}}
							onClick={this.props.handleSubmit}
						>
							{this.props.buttonName}
						</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

module.exports = withFormik({
	mapPropsToValues: ({good = {}}) => ({
		_id: good._id,
		name: good.name || '',
		description: good.description || '',
		type: good.type || 'frame',
		image: good.image || '',
		price: good.price || 0,
		entity: good[good.type] || {}
	}),
	validationSchema: yup.object({
		name: yup.string().required(),
		description: yup.string(),
		image: yup.string().required(),
		price: yup.number().integer().min(2).max(20000).required(),
		type: yup.mixed().oneOf([
			'frame',
			'headphone',
			'album',
			'mouse',
			'batterie',
			'cord',
			'disk'
		]).required(),
		entity: yup.lazy((values) => {
			switch (values.typeSheet === undefined) {
				case true:
					switch (values.spareCushions === undefined) {
						case true:
							switch (values.cord === undefined) {
								case true:
									switch (values.typeRecord === undefined) {
										case true:
											return yup.frame();
										case false:
											return yup.disk();
										default:
											return yup.object();
									}
								case false:
									return yup.mouse();
								default:
									return yup.object();
							}
						case false:
							return yup.headphone();
						default:
							return yup.object();
					}
				case false:
					return yup.album();
				default:
					return yup.object();
			}
		})
	}),
	handleSubmit: (values, {props}) => {
		const good = _(values).pick('_id', 'name', 'description', 'image', 'type', 'price');
		good[good.type] = values.entity;
		uploadImage(good.image).then(() => {
			axios[
				good._id ? 'patch' : 'post'
			](`/api/goods${good._id ? `/${good._id}` : ''}`, good).then(() => {
				props.router.push('/goods');
			});
		});
	}
})(GoodForm);

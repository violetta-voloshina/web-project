const _ = require('underscore');
const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {
	Button, Form, FormGroup, Label, FormText, Input
} = require('reactstrap');
const {FormControl} = require('react-bootstrap');
const {withFormik} = require('formik');
const helpers = require('app/helpers');
const yup = require('app/utils/yup');
const {uploadImage} = require('app/utils/uploads');
const FrameForm = require('./FrameForm');
const AlbumForm = require('./AlbumForm');
const HeadphoneForm = require('./HeadphoneForm');
// const MouseForm = require('./MouseForm');
// const BatterieForm = require('./BatterieForm');
// const CordForm = require('./CordForm');
// const DiskForm = require('./DiskForm');

const formsHash = {
	album: AlbumForm,
	// batterie: BatterieForm,
	// cord: CordForm,
	// disk: DiskForm,
	frame: FrameForm,
	headphone: HeadphoneForm
	// mouse: MouseForm
};

class GoodForm extends React.Component {

	static propTypes = {
		errors: PropTypes.any.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		setFieldValue: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}
	onImageChange = (event) => {
		const file = _(event.currentTarget.files).first();
		this.props.setFieldValue('image', {file});
	}

	onComponentChange = (name, value) => {
		const {values} = this.props;

		this.props.setFieldValue('entity', {
			...values[values.type],
			[name]: value
		});
	}

	onTypeChange = (event) => {
		this.props.setFieldValue('type', {
			...this.props.values.type,
			value: event.currentTarget.value
		});
	}

	render() {
		const {values, handleChange, errors} = this.props;
		console.log({values, errors});
		const FormComponent = formsHash[values.type.value];
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
					<h1>Добавление товара</h1>
				</div>
				<Form
					style={{
						paddingRight: 80,
						paddingLeft: 80,
						paddingTop: 0
						// position: 'absolute',
						// top: '100%',
						// left: '50%',
						// marginRight: '-50%',
						// transform: 'translate(-50%, -50%)'
					}}
				>
					<FormGroup error={errors.image}>
						<Label for="exampleFile">Выберите файл</Label>
						<Input type="file" name="image" onChange={this.onImageChange} />
						<FormText color="muted">
							Если изображение выбрано, высветится его название.
						</FormText>
					</FormGroup>
					<FormGroup error={errors.name}>
						<Label for="exampleFile">Название товара</Label>
						<Input
							bsSize="lg"
							name="name"
							type="text"
							placeholder="Название товара"
							value={values.name}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup error={errors.description}>
						<Label>Описание товара</Label>
						<Input
							bsSize="lg"
							name="description"
							type="text"
							placeholder="Описание товара"
							value={values.description}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup error={errors.type}>
						<Label>Тип товара</Label>
						<FormControl
							// bsSize="lg"
							// name="type"
							// type="select"
							// value={values.type}
							// onChange={this.onTypeChange}
							componentClass="select"
							onChange={this.onTypeChange}
							value={values.type.value}
							name="type"
						>
							<option value="frame">Рамка</option>
							<option value="album">Альбом</option>
							<option value='batterie'>Батарейка</option>
							<option value='cord'>Шнур</option>
							<option value='disk'>Диск</option>
							<option value='headphone'>Наушники</option>
							<option value='mouse'>Мышь</option>
						</FormControl>
					</FormGroup>
					<FormComponent
						values={values.entity}
						onChange={this.onComponentChange}
						errors={errors[values.type.value]}
					/>
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
							Добавить товар
						</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

module.exports = withFormik({
	mapPropsToValues: () => {
		const good = {
			name: '',
			description: '',
			type: {
				value: 'frame'
			}
		};

		_(['frame', 'headphone', 'album']).each(
			(key) => {
				good[key] = helpers.getDefaultValues(key);
			}
		);

		return good;
	},

	validationSchema: yup.object({
		name: yup.string().required(),
		description: yup.string(),
		type: yup.mixed().oneOf([
			'frame',
			'headphone',
			'album',
			'mouse',
			'batterie',
			'cord',
			'disk'
		]).required(),
		entity: yup.object().required()
	}),

	handleSubmit: (values) => {
		const good = {
			..._(values).pick('name', 'description', 'image'),
			type: values.type.value
		};

		good[good.type] = values.entity;

		uploadImage(good.image).then(() => {
			axios.post('/api/goods', good).then(
				() => {}
			);
		});
	}
})(GoodForm);

const _ = require('underscore');
const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {Button, Form, FormGroup, Label, FormText, Input} = require('reactstrap');
const {FormControl} = require('react-bootstrap');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const {uploadImage} = require('app/utils/uploads');
const FrameForm = require('./components/FrameForm');
const AlbumForm = require('./components/AlbumForm');
const HeadphoneForm = require('./components/HeadphoneForm');
const MouseForm = require('./components/MouseForm');

const formsHash = {
	album: AlbumForm,
	frame: FrameForm,
	headphone: HeadphoneForm,
	mouse: MouseForm
};

class GoodForm extends React.Component {

	static propTypes = {
		params: PropTypes.any.isRequired,
		route: PropTypes.any.isRequired,
		errors: PropTypes.any.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		setFieldValue: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}

	state = {
		stateValues: {}
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if (nextProps.stateValues !== prevState.stateValues) {
	// 		return {
	// 			stateValues: nextProps.stateValues
	// 		}
	// 	}

	// 	return null;
	// }

	componentDidMount() {
		const {params} = this.props;
		const id = params.id;
		console.log(true);
		if (id) {
			axios.get(`/api/goods/${id}`).then(({data}) => {
				this.setState({stateValues: data.goods[0]});
			});
		}
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

	handleSubmit = (event) => {
		event.preventDefault();
		console.log('updated');
	};

	render() {
		const {values, route, handleChange, errors} = this.props;
		const {stateValues} = this.state;
		const url = route.path.split('/')[1];
		let FormComponent = formsHash[values.type];
		console.log(values.type);
		let data = values;

		const edit = url === 'edit';

		if (edit) {
			data = stateValues;
			// FormComponent = formsHash[data.type];
		}

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
					{
						edit
							? <h1>Редактирование товара</h1>
							: <h1>Добавление товара</h1>
					}
				</div>
				<Form
					style={{
						paddingRight: 80,
						paddingLeft: 80,
						paddingTop: 0
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
							value={data.name}
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
							value={data.description}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup error={errors.type}>
						<Label>Тип товара</Label>
						<FormControl
							componentClass="select"
							onChange={this.onTypeChange}
							value={data.type}
							name="type"
						>
							<option value="frame">Рамка</option>
							<option value="album">Альбом</option>
							<option value='headphone'>Наушники</option>
							<option value='mouse'>Мышь</option>
						</FormControl>
					</FormGroup>
					<FormComponent
						values={data.entity}
						onChange={this.onGoodChange}
						errors={errors.entity}
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
						{

						}
						{
							edit
								? <Button
									type='submit'
									style={{
										background: 'gray',
										color: 'white',
										borderRadius: '1em'
									}}
									onClick={this.handleSubmit}
								>
									Изменить товар
								</Button>
								: <Button
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
						}
					</FormGroup>
				</Form>
			</div>
		);
	}
}

module.exports = withFormik({
	mapPropsToValues: () => ({
		name: '',
		description: '',
		type: 'headphone'
	}),

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

	handleSubmit: (values, {props}) => {
		const good = _(values).pick('name', 'description', 'image', 'type');
		good[good.type] = values.entity;

		uploadImage(good.image).then(() => {
			axios.post('/api/goods', good).then(() => {
				props.router.push('/goods');
			});
		});
	}
})(GoodForm);
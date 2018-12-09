const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const _ = require('underscore');
const {
	Form, FormGroup, Input, Label
} = require('reactstrap');
const {Button} = require('react-bootstrap');

class Registration extends React.Component {

	static propTypes = {
		errors: PropTypes.any.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		values: PropTypes.any.isRequired
	}

	onTypeChange = () => {
		console.log('dfgfd');
	}

	render() {
		const {values, handleChange, errors} = this.props;

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
					<h2>Форма регистрации</h2>
				</div>
				<Form
					style={{
						paddingRight: 80,
						paddingLeft: 80,
						paddingTop: 0
					}}
				>
					<FormGroup error={errors.name}>
						<Label>Введите фамилию</Label>
						<Input
							type="text"
							name="name"
							placeholder="Иванов"
							value={values.name}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup error={errors.secondname}>
						<Label>Введите имя</Label>
						<Input
							type="text"
							name="secondname"
							placeholder="Иван"
							value={values.secondname}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup error={errors.email}>
						<Label for="exampleEmail">Введите Email</Label>
						<Input
							type="email"
							name="email"
							placeholder="ivanivanov@mail.ru"
							value={values.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup error={errors.password}>
						<Label for="examplePassword">Придумайте пароль</Label>
						<Input
							type="password"
							name="password"
							placeholder="Пароль"
							value={values.password}
							onChange={handleChange}
						/>
					</FormGroup>
					<Button
						type="submit"
						onClick={this.props.handleSubmit}
					>
						Зарегистрироваться
					</Button>
				</Form>
			</div>
		);
	}
}

module.exports = withFormik({
	mapPropsToValues: () => ({
		name: '',
		secondname: '',
		email: '',
		password: ''
	}),
	validationSchema: yup.object({
		name: yup.string(),
		secondname: yup.string(),
		email: yup.string().email().required(),
		password: yup.string()
	}),

	handleSubmit: (values, {props}) => {
		const registration = values;

		axios.post('/api/registration', registration).then(() => {
			props.router.push('/registration');
		});
	}
})(Registration);

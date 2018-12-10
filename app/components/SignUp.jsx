const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const {Form, FormGroup, Input, Label} = require('reactstrap');
const {Button} = require('react-bootstrap');

function SignUpForm({errors, handleSubmit, values, handleChange}) {
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
				<h2>Регистрация нового пользователя</h2>
			</div>
			<Form
				style={{
					paddingRight: 80,
					paddingLeft: 80,
					paddingTop: 0
				}}
			>
				<FormGroup error={errors.name}>
					<Label>Фамилия</Label>
					<Input
						type="text"
						name="firstName"
						placeholder="Иванов"
						value={values.name}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup error={errors.secondname}>
					<Label>Имя</Label>
					<Input
						type="text"
						name="secondName"
						placeholder="Иван"
						value={values.secondname}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup error={errors.email}>
					<Label for="exampleEmail">e-mail</Label>
					<Input
						type="email"
						name="email"
						placeholder="ivanivanov@mail.ru"
						value={values.email}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup error={errors.password}>
					<Label for="examplePassword">Пароль</Label>
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
					onClick={handleSubmit}
				>
					Зарегистрироваться
				</Button>
			</Form>
		</div>
	);
}

SignUpForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	values: PropTypes.shape({
		firstName: PropTypes.string,
		secondName: PropTypes.string
	}).isRequired,
	errors: PropTypes.any.isRequired
};

module.exports = withFormik({
	mapPropsToValues: () => ({
		firstName: '',
		secondName: '',
		email: '',
		password: ''
	}),
	validationSchema: yup.object({
		firstName: yup.string().required(),
		secondName: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().required()
	}),

	handleSubmit: (values, {props}) => {
		axios.post('/api/signup', values).then(() => {
			props.router.push('/');
		});
	}
})(SignUpForm);

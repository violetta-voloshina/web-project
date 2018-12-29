const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const {
	Button, Form, FormGroup, Col, FormControl, ControlLabel
} = require('react-bootstrap');

function SignInForm({values, handleChange, errors, handleSubmit}) {
	console.log(errors);
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
				<h2>Вход в систему</h2>
			</div>
			<Form
				horizontal
				style={{
					paddingRight: 80,
					paddingLeft: 80,
					paddingTop: 0
				}}
			>
				{/* TODO: make error red color */}
				<FormGroup>
					<Col componentClass={ControlLabel} sm={2}>
						{errors.auth}
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						e-mail
					</Col>
					<Col sm={10}>
						<FormControl
							error={errors.email}
							type="email"
							name="email"
							placeholder="Email"
							value={values.email}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPassword">
					<Col componentClass={ControlLabel} sm={2}>
						Пароль
					</Col>
					<Col sm={10}>
						<FormControl
							error={errors.password}
							type="password"
							name="password"
							placeholder="Password"
							value={values.password}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col
						smOffset={2}
						sm={10}
						style={{
							display: 'flex'
						}}
					>
						<Button
							type="submit"
							onClick={handleSubmit}
						>
							Войти
						</Button>
						<a
							style={{
								margin: 'auto',
								marginLeft: '10px'
							}}
							href="/signup"
						>
							Зарегистрироваться
						</a>
					</Col>
				</FormGroup>
			</Form>
		</div>
	);
}

SignInForm.propTypes = {
	errors: PropTypes.any.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	values: PropTypes.any.isRequired
};

module.exports = withFormik({
	mapPropsToValues: () => ({
		email: '',
		password: ''
	}),
	validationSchema: yup.object({
		email: yup.string().email().required(),
		password: yup.string().required()
	}),

	handleSubmit: (values, {setFieldError, props}) => {
		axios.post('/api/signin', values).then(({data}) => {
			if (data === 'Wrong login/password') {
				setFieldError('auth', 'Неверный логин/пароль.');
				return;
			}

			props.router.push('/');
		});
	}
})(SignInForm);

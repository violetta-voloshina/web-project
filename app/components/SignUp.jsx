const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const {
	Button, Form, FormGroup, Col, FormControl, ControlLabel
} = require('react-bootstrap');

function SignUpForm({errors, handleSubmit, values, handleChange}) {
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
				<h2>Регистрация нового пользователя</h2>
			</div>
			<Form
				horizontal
				style={{
					paddingRight: 80,
					paddingLeft: 80,
					paddingTop: 0
				}}
			>
				<FormGroup validationState={errors.firstName ? 'error' : 'success'}>
					<Col componentClass={ControlLabel} sm={2}>
						Фамилия
					</Col>
					<Col sm={10}>
						<FormControl
							type="text"
							name="firstName"
							placeholder="Иванов"
							value={values.firstName}
							onChange={handleChange}
						/>
						<FormControl.Feedback />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.firstName && 'Введите фамилию'}
						</ControlLabel>
					</Col>
				</FormGroup>

				<FormGroup validationState={errors.secondName ? 'error' : 'success'}>
					<Col componentClass={ControlLabel} sm={2}>
						Имя
					</Col>
					<Col sm={10}>
						<FormControl
							type="text"
							name="secondName"
							placeholder="Иван"
							value={values.secondName}
							onChange={handleChange}
						/>
						<FormControl.Feedback />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.secondName && 'Введите имя'}
						</ControlLabel>
					</Col>
				</FormGroup>
				<FormGroup validationState={errors.email ? 'error' : 'success'}>
					<Col componentClass={ControlLabel} sm={2}>
						e-mail
					</Col>
					<Col sm={10}>
						<FormControl
							type="email"
							name="email"
							placeholder="example@mail.ru"
							value={values.email}
							onChange={handleChange}
						/>
						<FormControl.Feedback />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.email &&
								(errors.email === 'email is a required field' ?
									'Введите email' :
									'Введен некорректный e-mail. Пожалуйста вводите e-mail в формате: example@mail.ru'
								)
							}
						</ControlLabel>
					</Col>
				</FormGroup>

				<FormGroup validationState={errors.password ? 'error' : 'success'}>
					<Col componentClass={ControlLabel} sm={2}>
						Пароль
					</Col>
					<Col sm={10}>
						<FormControl
							type="password"
							name="password"
							placeholder="Password"
							value={values.password}
							onChange={handleChange}
						/>
						<FormControl.Feedback />
						<ControlLabel
							style={{
								textAlign: 'left'
							}}
						>
							{errors.password && 'Введите пароль'}
						</ControlLabel>
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
							Зарегистрироваться
						</Button>
					</Col>
				</FormGroup>
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
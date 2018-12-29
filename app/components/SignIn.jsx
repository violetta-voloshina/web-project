const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const {
	Button,Pane, Form, Tab, Formsy, FormGroup, ControlLabel, TextInput
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
				<Tab.Pane eventKey="email">
					<Formsy.Form onValidSubmit={this.handleLogin} onValid={this.enableButton} onInvalid={this.disableButton}>

						<FormGroup>
							<ControlLabel>Email</ControlLabel>
								<TextInput name="email" type="text" validations={{isGoogleEmail: validations.isGoogleEmail}} validationErrors={{isGoogleEmail: 'Only Gmail boxes are accepted'}} required/>
						</FormGroup>

						<FormGroup>
							<ControlLabel>Password</ControlLabel>
								<TextInput name="loginPassword" type="password" validations={{strongPassword: validations.strongPassword}} validationErrors={{strongPassword: "Enter a strong password! At least 6 symbols"}} required/>
						</FormGroup>

						<FormGroup>
							<Button type="submit" bsStyle="primary" disabled={!this.state.isButtonEnabled} block>Login</Button>
						</FormGroup>

					</Formsy.Form>
				</Tab.Pane>
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

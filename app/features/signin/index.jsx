const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {withFormik} = require('formik');
const yup = require('app/utils/yup');
const _ = require('underscore');
const {
	Button, Form, FormGroup, Col, Checkbox, FormControl, ControlLabel
} = require('react-bootstrap');

class SignIn extends React.Component {

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
					<h2>Форма авторизации</h2>
				</div>
				<Form
					horizontal
					style={{
						paddingRight: 80,
						paddingLeft: 80,
						paddingTop: 0
					}}
				>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Email
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
							Password
						</Col>
						<Col sm={10}>
							<FormControl
								error={errors.password}
								type="password"
								placeholder="Password"
								value={values.password}
								onChange={handleChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Checkbox>Запомнить меня</Checkbox>
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
								onClick={this.props.handleSubmit}
							>
								Войти
							</Button>
							<div
								style={{
									margin: 'auto',
    								marginLeft: '10px'
								}}
							>
								<a href='/registation'>
									Если вы не зарегистрированы, нажмите для регистрации
								</a>
							</div>
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
}
// function equalTo(ref: any, msg: any) {
// 	return Yup.mixed().test({
// 	  name: 'equalTo',
// 	  exclusive: false,
// 	  message: msg || '${path} must be the same as ${reference}',
// 	  params: {
// 		reference: ref.path,
// 	  },
// 	  test: function(value: any) {
// 		return value === this.resolve(ref);
// 	  },
// 	});
//   }
//   Yup.addMethod(Yup.string, 'equalTo', equalTo);

module.exports = withFormik({
	mapPropsToValues: () => ({
		email: '',
		password: ''
	}),
	validationSchema: yup.object({
		email: yup.string().email().required(),
		password: yup.string()
		// password: yup.string().equal(
		// 	yup.ref('password'), 'Passwords must match'
		// ).required('Required')
	}),

	handleSubmit: (values, {props}) => {
		const signin = values;

		axios.post('/api/signin', signin).then(() => {
			props.router.push('/signin');
		});
	}
})(SignIn);

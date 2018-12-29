const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');
const {Button, Form, FormGroup, Label, Input} = require('reactstrap');
const {withFormik} = require('formik');
const yup = require('yup');

function ServiceForm({values, handleChange, errors, ...props}) {
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
				<h1>{props.header}</h1>
			</div>
			<Form
				style={{
					paddingRight: 80,
					paddingLeft: 80,
					paddingTop: 0
				}}
			>
				<FormGroup>
					<Label for="exampleFile">Название услуги</Label>
					<Input
						bsSize="lg"
						name="name"
						type="text"
						placeholder="Название услуги"
						value={values.name}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup error={errors.description}>
					<Label>Описание услуги</Label>
					<Input
						bsSize="lg"
						name="description"
						type="text"
						placeholder="Описание услуги"
						value={values.description}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup error={errors.price}>
					<Label>Цена на услугу</Label>
					<Input
						bsSize="lg"
						name="price"
						type="number"
						max={20000}
						min={2}
						placeholder="Цена на услугу"
						step="1"
						value={values.price}
						onChange={handleChange}
					/>
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
						onClick={props.handleSubmit}
					>
						{props.buttonName}
					</Button>
				</FormGroup>
			</Form>
		</div>
	);
}

ServiceForm.propTypes = {
	errors: PropTypes.any.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	values: PropTypes.any.isRequired,
	header: PropTypes.string.isRequired,
	buttonName: PropTypes.string.isRequired
};

module.exports = withFormik({
	mapPropsToValues: ({service = {}}) => ({
		_id: service._id,
		name: service.name || '',
		description: service.description || '',
		price: service.price || 2
	}),

	validationSchema: yup.object({
		name: yup.string().required(),
		description: yup.string(),
		price: yup.number().integer().min(2).max(20000).required()
	}),

	handleSubmit: (values, {props}) => {
		axios[
			values._id ? 'patch' : 'post'
		](`/api/services${values._id ? `/${values._id}` : ''}`, values).then(() => {
			props.router.push('/services');
		});
	}
})(ServiceForm);

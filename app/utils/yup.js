const _ = require('underscore');
const yup = require('yup');

_(exports).extend(yup);

exports.frame = () => yup.object({
	material: yup.string().required(),
	size: yup.object({
		width: yup.number().integer().min(2).max(60).required(),
		height: yup.number().integer().min(2).max(60).required()
	}).required()
});

exports.headphone = () => yup.object({
	spareCushions: yup.bool().required(),
	microphone: yup.bool().required(),
	sensitivity: yup.number().integer().min(80).max(300),
	color: yup.string(),
	manufacturer: yup.string()
});

exports.album = () => yup.object({
	typeSheet: yup.string().required(),
	countSheet: yup.number().integer().min(10).max(4000).required(),
	sizePhoto: yup.object({
		width: yup.number().integer().min(2).max(60).required(),
		height: yup.number().integer().min(2).max(60).required()
	}).required()
});

exports.mouse = () => yup.object({
	cord: yup.boolean(),
	color: yup.string(),
	manufacturer: yup.string()
});
// spareCushions: yup.boolean(),
// microphon: yup.boolean(),
// color: yup.string(),
// manufacturer: yup.string(),
// cord: yup.boolean(),
// sensitivity: yup.number().integer().min(80).max(300),
// model: yup.string(),
// length: yup.number().integer().min(1).max(100),
// entrance: yup.string(),
// output: yup.string(),
// typeRecord: yup.string()

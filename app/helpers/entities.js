exports.frameDefaultValues = {
	material: '',
	size: {
		width: 2,
		height: 2
	}
};

exports.albumDefaultValues = {
	sizePhoto: {
		width: 0,
		height: 0
	},
	typeSheet: '',
	countSheet: 0
};

exports.headphoneDefaultValues = {
	spareCushions: false,
	microphone: false,
	manufacturer: '',
	color: '',
	sensitivity: 0
};

exports.mouseDefaultValues = {
	manufacturer: '',
	color: '',
	cord: false
};

exports.batterieDefaultValues = {
	model: ''
};

exports.cordDefaultValues = {
	length: 0,
	entrance: '',
	output: ''
};

exports.diskDefaultValues = {
	typeRecord: ''
};

exports.getDefaultValues = (type) => exports[`${type}DefaultValues`];

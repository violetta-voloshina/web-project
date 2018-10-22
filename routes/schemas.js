
exports.frame = {
	type: 'object',
	properties: {
		size: {
			type: 'object',
			properties: {
				width: {
					type: 'number',
					required: true,
					minimum: 2,
					maximum: 60
				},
				heigth: {
					type: 'number',
					required: true,
					minimum: 2,
					maximum: 60
				}
			},
			required: true
		},
		material: {
			type: 'string',
			required: true,
			minLength: 1,
			maxLenth: 20,
		}
	}
}
exports.album =  {
	type: 'object',
	properties: {
		sizePhoto: {
			type: 'object',
			properties: {
				width: {
					type: 'number',
					required: true,
					minimum: 2,
					maximum: 60
				},
				heigth: {
					type: 'number',
					required: true,
					minimum: 2,
					maximum: 60
				}
			},
			required: true
		},
		typeSheet: {
			type: 'string',
			required: true,
			minLength: 1,
			maxLenth: 20,
		},
		countSheet: {
			type: 'number',
			required: true,
			minimum: 10,
			maximum: 4000
		}
	}
}

exports.headphone = {
	type: 'object',
	properties: {
		spareCushions:{
			type: 'boolean',
			required: true,
		},
		microphone:{
			type: 'boolean',
			required: true,
		},
		color:{
			type: 'string',
			minLength: 1,
			maxLenth: 50,
		},
		sensitivity:{
			type: 'number',
			minimum: 10,
			maximum: 300
		},
		manufacturer:{
			type: 'string',
			minLength: 1,
			maxLenth: 20,
		}
	},
}
exports.batterie = {
	type: 'object',
	properties: {
		model:{
			type: 'string',
			required: true,
			minLength: 1,
			maxLenth: 20,
		}
	}
}
exports.cord = {
	type: 'object',
	properties: {
		length:{
			type: 'number',
			required: true,
			minimum: 1,
			maximum: 100
		},
		entrance:{
			type: 'string',
			required: true,
			minLength: 1,
			maxLenth: 10,
		},
		output:{
			type: 'string',
			required: true,
			minLength: 1,
			maxLenth: 10,
		}
	}
}
exports.mouse = {
	type: 'object',
	properties: {
		cord:{
			type: 'boolean',
			required: true,
		},
		manufacturer:{
			type: 'string',
			minLength: 1,
			maxLenth: 20,
		},
		color:{
			type: 'string',
			minLength: 1,
			maxLenth: 50,
		}
	}
}
exports.disk = {
	type: 'object',
	properties: {
		typeRecord:{
			type: 'string',
			required: true,
			minLength: 2,
			maxLenth: 7,
		}
	}
}


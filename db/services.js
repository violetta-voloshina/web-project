const Collection = require('mongodbext').Collection;

exports.create = (db) => {
	exports.collection = new Collection(db, 'services');

	return exports.collection;
};

exports.init = () => {
	const collection = exports.collection;

	collection.addPlugin('sequence');
	collection.addPlugin('createDate');
	collection.addPlugin('updateDate');
};

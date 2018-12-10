class NotFoundError extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'NotFoundError';
		this.message = 'Entity not found';
		this.userMessage = 'Сущность не найдена';
		this.statusCode = 404;
	}
}

class ForbiddenAttachmentType extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'ForbiddenAttachmentType';
		this.message = 'The file type of the attachment isn’t allowed.';
		this.userMessage = 'Тип файла не разрешен';
		this.statusCode = 500;
	}
}

class UnauthorizedError extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'UnauthorizedError';
		this.message = 'You have no access';
		this.userMessage = 'Доступ запрещен';
		this.statusCode = 401;
	}
}

exports.NotFoundError = NotFoundError;

exports.ForbiddenAttachmentType = ForbiddenAttachmentType;

exports.UnauthorizedError = UnauthorizedError;

import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './customError';

// Principle SOLID: Liskov Sustitution
export class JoiRequestValidationError extends CustomError {
	statusCode = HTTP_STATUS.BAD_REQUEST;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

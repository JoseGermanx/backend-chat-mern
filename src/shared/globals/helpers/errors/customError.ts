import { IError } from './error.interface';

// Design Pattern Facade: https://refactoring.guru/es/design-patterns/facade
// Design Pattern Singleton: https://refactoring.guru/es/design-patterns/singleton
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

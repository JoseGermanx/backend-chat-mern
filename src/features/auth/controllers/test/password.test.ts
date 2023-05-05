import { INVALID_EMAIL, authMockRequest, authMockResponse } from '@root/shared/globals/mocks/auth.mock';
import { Request, Response } from 'express';
import { Password } from '../password';
import { CustomError } from '@helpers/errors/customError';

jest.useFakeTimers();

describe('Password', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  // UNITARY TEST 1
  describe('Create', () => {
    it('Should throw an error if email is invalid', async () => {

      // GIVEN STEP
      const req: Request = authMockRequest({}, { email: INVALID_EMAIL }) as Request;
      const res: Response = authMockResponse();

      // WHEN STEP
      await Password.prototype.create(req, res).catch((error: CustomError) => {

      // THEN STEP
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Email must be valid');
      });
    });
  });
});

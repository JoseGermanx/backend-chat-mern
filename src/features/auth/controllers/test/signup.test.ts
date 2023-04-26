import { Request, Response } from 'express';
import * as cloudinaryUploads from '@helpers/cloudinary/cloudinaryUploads';
import { userQueue } from '@services/queues/user.queue';
import { authQueue } from '@services/queues/auth.queue';
import { UserCache } from '@services/redis/user.cache';
import { authMockRequest } from '@root/shared/globals/mocks/auth.mock';
import { authMockResponse } from '@root/shared/globals/mocks/auth.mock';
import { SignUp } from '../signup';
import { CustomError } from '@helpers/errors/customError';

jest.useFakeTimers();
jest.mock('@services/queues/base.queue');
jest.mock('@helpers/cloudinary/cloudinaryUploads');
jest.mock('@services/redis/user.cache');
jest.mock('@services/queues/user.queue');
jest.mock('@services/queues/auth.queue');

describe('Signup', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  // Unitary test 1
  it('should throw an error if username is not available', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: '',
        email: 'yorman@gmail.com',
        password: 'yordev',
        avatarColor: 'red',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
      }
    ) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    SignUp.prototype.create(req, res).catch((error: CustomError) => {

    // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Username is a required field');
    });
  });
});


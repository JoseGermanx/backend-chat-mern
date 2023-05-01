import { Request, Response } from 'express';
import * as cloudinaryUploads from '@helpers/cloudinary/cloudinaryUploads';
import { userQueue } from '@services/queues/user.queue';
import { authQueue } from '@services/queues/auth.queue';
import { UserCache } from '@services/redis/user.cache';
import { authMock, authMockRequest } from '@root/shared/globals/mocks/auth.mock';
import { authMockResponse } from '@root/shared/globals/mocks/auth.mock';
import { SignUp } from '../signup';
import { CustomError } from '@helpers/errors/customError';
import { authService } from '@services/db/auth.service';

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

  // Design Pattern: https://martinfowler.com/bliki/GivenWhenThen.html
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

  // Unitary test 2
  it('should throw an error if username length is greater than maximum length', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'leodoro2023',
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
      expect(error.serializeErrors().message).toEqual('Invalid username');
    });
  });

   // Unitary test 3
  it('should throw an error if email is not valid', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'yordev',
        email: 'asdadasdsasadas',
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
      expect(error.serializeErrors().message).toEqual('Email must be valid');
    });
  });

  // Unitary test 4
  it('should throw an error if email is not available', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'yordev',
        email: '',
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
      expect(error.serializeErrors().message).toEqual('Email is a required field');
    });
  });

  // Unitary test 5
  it('should throw an error if password is not available', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'yordev',
        email: 'yormandev@gmail.com',
        password: '',
        avatarColor: 'red',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
      }
    ) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    SignUp.prototype.create(req, res).catch((error: CustomError) => {

    // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Password is a required field');
    });
  });

  // Unitary test 6
  it('should throw an error if password length is less than minimum length', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'yordev',
        email: 'yormandev@gmail.com',
        password: 'yo',
        avatarColor: 'red',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
      }
    ) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    SignUp.prototype.create(req, res).catch((error: CustomError) => {

    // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Invalid password');
    });
  });

  // Unitary test 7
  it('should throw an error if password length is greater than maximum length', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'yordev',
        email: 'yormandev@gmail.com',
        password: 'yosadadadsadas',
        avatarColor: 'red',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
      }
    ) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    SignUp.prototype.create(req, res).catch((error: CustomError) => {

    // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Invalid password');
    });
  });

  // Unitary test 8: Integration Tests
  it('should throw unhatorize error is user already exist', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'Yorman',
        email: 'yorman@gmail.com',
        password: 'yorpro',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
      }
    ) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    jest.spyOn(authService, 'getUserByUsernameOrEmail').mockResolvedValue(authMock);
    SignUp.prototype.create(req, res).catch((error: CustomError) => {

    // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Invalid credentials for this user');
    });
  });

  // Unitary test 9: Integration Tests
  /*it('should set session data for valid credentials and send correct json response for user create successfully', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: 'Yorman',
        email: 'yorman@gmail.com',
        password: 'yorpro',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
      }
    ) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    jest.spyOn(authService, 'getUserByUsernameOrEmail').mockResolvedValue(null!);
    //const userSpy = jest.spyOn(UserCache.prototype, 'saveToUserCache');

    SignUp.prototype.create(req, res);

    // THEN STEP: ASSERT
      //expect(error.statusCode).toEqual(400);
      //expect(error.serializeErrors().message).toEqual('Invalid credentials for this user');
    });*/
});


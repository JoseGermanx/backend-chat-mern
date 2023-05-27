import { PASSWORD, USERNAME, authMockRequest, authMockResponse } from '@root/shared/globals/mocks/auth.mock';
import { Request, Response } from 'express';
import { SignOut } from '../signout';

jest.useFakeTimers();

describe('Signout', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('Should set session to null', async () => {

    const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }) as Request;
    const res: Response = authMockResponse();

    await SignOut.prototype.update(req, res);

    expect(req.session).toBeNull();
  });

  it('Should send correct json response for logout succesful', async () => {

    const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }) as Request;
    const res: Response = authMockResponse();

    await SignOut.prototype.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logout successful',
      user: {},
      token: ''
    });
  });
});

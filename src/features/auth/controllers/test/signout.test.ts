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

  // UNITARY TEST 1
  it('Should set session to null', async () => {

    // GIVEN STEP
    const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    await SignOut.prototype.update(req, res);

    // THEN STEP: ASSERT
    expect(req.session).toBeNull();
  });

  // UNITARY TEST 2
  it('Should send correct json response for logout succesful', async () => {

    // GIVEN STEP
    const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }) as Request;
    const res: Response = authMockResponse();

    // WHEN STEP
    await SignOut.prototype.update(req, res);

    // THEN STEP: ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logout successful',
      user: {},
      token: ''
    });
  });
});

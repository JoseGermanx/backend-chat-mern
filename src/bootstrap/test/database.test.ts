import mongoose, { connect } from 'mongoose';
import { config } from '@configs/configEnvs';
import { FAILED_PATH_DB } from '@root/shared/globals/mocks/database.mock';
import { redisConnection } from '@services/redis/redis.connection';

jest.useFakeTimers();
jest.mock('@configs/configEnvs');
jest.mock('@services/redis/redis.connection');
jest.mock('@configs/configLogs');

describe('Mongo and Redis database connections', () => {

  beforeEach((done: jest.DoneCallback) => {
    jest.resetAllMocks();
    done();
  });

  afterEach((done: jest.DoneCallback) => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    mongoose.connection.close();
    done();
  });

  // INTEGRATION TEST 1
  it('Should throw an error if the database does not connect', () => {

    // GIVEN STEP
    mongoose.connect = jest.fn(() => {
      throw new Error('Error connecting to database');
    });

    // WHEN STEP
    const expectedUrl = FAILED_PATH_DB;

    // THEN STEP: ASSERTION
    expect(() => {
      connect(expectedUrl);
    }).toThrowError(/Error connecting to database/);
  });

  // INTEGRATION TEST 2
  it('Should must be connect to database mongo connection and call redis connection', done => {

    // GIVEN STEP
    const spy = jest.spyOn(mongoose, 'connect');
    const expectedUrl = `${config.DATABASE_URL}`;

    // WHEN STEP
    connect(expectedUrl);
    jest.spyOn(redisConnection, 'connect');

    // THEN STEP: ASSERTION
    expect(spy).toHaveBeenCalledWith(expectedUrl);
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });
});

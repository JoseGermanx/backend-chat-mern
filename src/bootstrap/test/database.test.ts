jest.useFakeTimers();

describe('Mongo and Redis database connections', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  // INTEGRATION TEST 1
  it('Should throw an error if the database does not connect', () => {

  });
});

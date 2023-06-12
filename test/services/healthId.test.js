/* eslint-disable no-global-assign */
const healthId = require('../../src/services/healthId');
const getToken = require('../../src/services/gateway');
const response = require('../../src/utils/response');

jest.mock('../../src/utils/fetch');
jest.mock('../../src/utils/response', () => ({
  checkForErrorsInResponse: jest.fn(),
  convertToResponseBody: jest.fn(),
  parseFromResponseHeader: jest.fn(),
}));
jest.mock('../../src/services/gateway');

describe('healthId service', () => {
  const path = '/test';
  const body = {};
  const mockAccessToken = 'mockAccessToken';
  const headers = { 'content-type': 'xyz' };

  beforeEach(() => {
    jest.resetAllMocks();
    process.env.HEALTH_ID_URL = 'mockHealthIdUrl';
  });
  afterEach(() => {
    delete process.env.HEALTH_ID_URL;
  });
  it('should call getToken GET', async () => {
    const method = 'GET';
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({}),
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
    });

    response.checkForErrorsInResponse = jest.fn().mockResolvedValueOnce({});
    response.parseFromResponseHeader.mockResolvedValueOnce({});
    getToken.mockResolvedValue(mockAccessToken);
    await healthId(path, method, headers, body);
    expect(getToken).toBeCalledTimes(1);
  });
  it('should call getToken POST', async () => {
    const method = 'POST';
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({}),
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
    });
    response.pars;

    response.checkForErrorsInResponse = jest.fn().mockResolvedValueOnce({});
    response.convertToResponseBody = jest.fn().mockResolvedValueOnce({});
    getToken.mockResolvedValue(mockAccessToken);
    await healthId(path, method, headers, body);
    expect(getToken).toBeCalledTimes(1);
  });

  it('should handle a special route', async () => {
    const method = 'GET';
    const path = '/special';
    const headers = {};
    const body = {};
    const mockAccessToken = 'mockAccessToken';

    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({}),
      headers: { get: jest.fn().mockReturnValueOnce('image') },
    });

    response.checkForErrorsInResponse = jest.fn().mockResolvedValueOnce({});
    response.parseFromResponseHeader = jest.fn().mockResolvedValueOnce({});

    getToken.mockResolvedValue(mockAccessToken);

    const result = await healthId(path, method, headers, body);

    expect(result).toEqual({
      data: undefined,
      status: 200,
    });
  });
});
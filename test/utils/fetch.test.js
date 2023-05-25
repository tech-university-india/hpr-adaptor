const cacheFetch = require('../../src/utils/fetch');
const mCache = require('../../src/utils/mCache');
const response = require('../../src/utils/response');

jest.mock('../../src/utils/mCache');
jest.mock('../../src/utils/response');

const mockJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjEyMzQ1Nn0.3YyVJkut2COHYEsWgCR5zAc7dOp0CzSUeU_hdokdUqQ';

describe('cacheFetch', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch data from cache when available', async () => {
    const requestOptions = { url: 'https://example.com/api/data' };
    const cachedData = { accessToken: mockJWT };
    mCache.setCache.mockResolvedValueOnce();
    mCache.getCache.mockReturnValueOnce(JSON.stringify(cachedData));

    const result = await cacheFetch(requestOptions);

    expect(result).toEqual(cachedData);
    expect(mCache.getCache).toHaveBeenCalledWith(requestOptions.url);
  });

  it('should fetch data from API when not available in cache', async () => {
    const requestOptions = { url: 'https://example.com/api/data' };
    const apiResponse = { accessToken: 'new_access_token' };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(apiResponse),
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
    });
    const expectedCacheData = { accessToken: apiResponse.accessToken };
    mCache.getCache.mockReturnValueOnce(null);
    response.checkForErrorsInResponse.mockResolvedValueOnce();
    response.convertToResponseBody.mockResolvedValueOnce(apiResponse);
    mCache.setCache.mockResolvedValueOnce();

    const result = await cacheFetch(requestOptions);

    expect(result).toEqual(expectedCacheData);
  });

  it('should update the token expiry when isToken is true', async () => {
    const requestOptions = {
      url: 'https://example.com/api/token',
      method: 'POST',
    };
    const apiResponse = { accessToken: mockJWT };
    const expectedCacheData = { accessToken: apiResponse.accessToken };
    mCache.getCache.mockReturnValueOnce(null);
    response.checkForErrorsInResponse.mockResolvedValueOnce();
    response.convertToResponseBody.mockResolvedValueOnce(apiResponse);
    mCache.setCache.mockResolvedValueOnce();

    const result = await cacheFetch(requestOptions, true);
    expect(result).toEqual(expectedCacheData);
    expect(mCache.setCache).toBeCalled();
  });

  it('should update the token expiry when isToken is true', async () => {
    const requestOptions = {
      url: 'https://example.com/api/token',
      method: 'POST',
    };
    const apiResponse = { accessToken: mockJWT };
    const expectedCacheData = { accessToken: apiResponse.accessToken };
    mCache.getCache.mockReturnValueOnce(null);
    response.checkForErrorsInResponse.mockResolvedValueOnce();
    response.convertToResponseBody.mockResolvedValueOnce(
      apiResponse.accessToken
    );
    mCache.setCache.mockResolvedValueOnce();

    const result = await cacheFetch(requestOptions, true);
    expect(result).toEqual(expectedCacheData);
    expect(mCache.setCache).toBeCalled();
  });
});
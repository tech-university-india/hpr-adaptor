const Response = require('../../src/utils/response');
const requestError = require('../../src/utils/requestError');

describe('checkForErrorsInResponse', () => {
  it('throws a RequestError with the appropriate message and status if the response status is >= 400 and the response body contains a "message" field', async () => {
    const response = {
      status: 401,
      text: async () => JSON.stringify({ message: 'Unauthorized' }),
    };
    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      requestError.RequestError
    );
    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      'Unauthorized'
    );
  });

  it('throws a RequestError with the appropriate message and status if the response status is >= 400 and the response body contains a "details" field', async () => {
    const response = {
      status: 400,
      json: async () => ({ details: [{ message: 'Bad request' }] }),
      text: async () => ({ details: [{ message: 'Bad request' }] }),
    };
    Response.convertToResponseBody = jest.fn().mockReturnValue(response.json());
    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      requestError.RequestError
    );
    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      'Bad request'
    );
  });
  it('throws a RequestError with the appropriate message and status if the response status is >= 400 and the response body contains a "message" field', async () => {
    const response = {
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
      text: async () => ({ message: 'Unauthorized' }),
    };

    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      requestError.RequestError
    );
    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      'Unauthorized'
    );
  });
  it('throws a RequestError with a default message and the response status if the response status is >= 400 and the response body does not contain a "details" or "message" field', async () => {
    const response = {
      status: 500,
      json: async () => ({}),
      text: async () => ({}),
    };

    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      requestError.RequestError
    );
    await expect(Response.checkForErrorsInResponse(response)).rejects.toThrow(
      'Some unknown error'
    );
  });
  it('does not throw an error if the response status is < 400', async () => {
    const response = {
      status: 200,
    };

    await expect(
      Response.checkForErrorsInResponse(response)
    ).resolves.not.toThrow();
  });
});
describe('convertToResponseBody', () => {
  test('should return parsed JSON when response contains valid JSON data', async () => {
    const response = {
      status: 400,
      message: 'Bad request',
      text: async () => ({ details: [{ message: 'Bad request' }] }),
    };
    const result = await Response.convertToResponseBody(response);
    expect(result).toEqual({ details: [{ message: 'Bad request' }] });
  });

  test('should return plain text when response does not contain valid JSON data', async () => {
    const response = 'This is data';
    const result = await Response.convertToResponseBody(response);
    expect(result).toStrictEqual({ details: [{ message: 'Bad request' }] });
  });
});

describe('parseHeaderFromResponse', () => {
  it('should return converted response body when response header does not contains "content-type" field', async () => {
    Response.convertToResponseBody.mockResolvedValue({});
    await Response.parseFromResponseHeader({
      headers: { get: jest.fn().mockReturnValue('') },
      text: jest.fn().mockResolvedValue('This is data'),
    });
    expect(Response.convertToResponseBody).toHaveBeenCalled();
  });
  it('should return converted response body when response header contains "content-type" of some image', async () => {
    Response.convertToResponseBody.mockResolvedValue({});
    await Response.parseFromResponseHeader({
      headers: { get: jest.fn().mockReturnValue('image/png') },
      arrayBuffer: jest.fn().mockResolvedValue('This is data'),
    });
    expect(Response.convertToResponseBody).toHaveBeenCalled();
  });
  it('should return converted response body when response header contains any other content type', async () => {
    Response.convertToResponseBody.mockResolvedValue({});
    await Response.parseFromResponseHeader({
      headers: { get: jest.fn().mockReturnValue('application/json') },
      text: jest.fn().mockResolvedValue('This is data'),
    });
    expect(Response.convertToResponseBody).toHaveBeenCalled();
  });
});
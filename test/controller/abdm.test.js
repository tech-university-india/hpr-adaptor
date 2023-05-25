const healthId = require('../../src/services/healthId');
const RequestError = require('../../src/utils/requestError');
const abdm = require('../../src/controllers/abdm');

jest.mock('../../src/services/healthId');

describe('abdm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const req = {
    baseUrl: '/foo',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { foo: 'bar' },
  };

  it('should return response from healthId service', async () => {
    const response = { status: 200, data: { message: 'OK' } };
    healthId.mockResolvedValue(response);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await abdm(req, res);

    expect(healthId).toHaveBeenCalledWith(
      '/foo',
      'POST',
      { 'Content-Type': 'application/json' },
      { foo: 'bar' }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it('should handle RequestError', async () => {
    const error = new RequestError('Invalid request', 400);
    healthId.mockRejectedValueOnce(error);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await abdm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request' });
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle internal server error', async () => {
    const error = new Error('Something went wrong');

    healthId.mockRejectedValueOnce(error);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await abdm(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    expect(res.send).not.toHaveBeenCalled();
  });
});
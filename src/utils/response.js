const RequestError = require('./requestError');

/**
 * @param {Response} response
 */
const checkForErrorsInResponse = async (response) => {
  if (response.status >= 400) {
    const data = await convertToResponseBody(response);
    if (data.details && data.details.length > 0) {
      throw new RequestError(data.details[0].message, response.status);
    } else if (data.message) {
      throw new RequestError(data.message, response.status);
    }
    throw new RequestError('Some unknown error', response.status);
  }
};

const parseFromResponseHeader = async (response) => {
  if (!response.headers.get('content-type')) {
    return await convertToResponseBody(response);
  }
  if (response.headers.get('content-type').includes('image')) {
    return await response.arrayBuffer().then((image) => Buffer.from(image));
  }
  return await convertToResponseBody(response);
};
const convertToResponseBody = async (response) => {
  const data = await response.text();
  try {
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    return data;
  }
};

module.exports = {
  checkForErrorsInResponse,
  parseFromResponseHeader,
  convertToResponseBody,
};
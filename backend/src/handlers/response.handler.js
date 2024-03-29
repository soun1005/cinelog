// main function to check response
const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

// const ok = (res, data) => responseWithData(res, 200, data);
const ok = (data) => res.status.json(data);

const created = (res, data) => responseWithData(res, 201, data);

const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: 'Oops! Something wrong!',
  });

const badrequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

const unauthorize = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: 'Unathorized',
  });

const notfound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: 'Not found',
  });

export default {
  error,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound,
};

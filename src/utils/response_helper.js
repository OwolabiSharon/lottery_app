const ErrorResponse = (res, err, code) => {
  res.statusCode = code;

  const error = {
    status: false,
    message:
        // eslint-disable-next-line no-nested-ternary
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Something went wrong',
  };

  return res.status(code).json(error);
};

const SuccessResponse = (
  res,
  message,
  data,
  code = 200,
) => {
  const sendData = {
    data,
    status: true,
    message,
  };

  res.statusCode = code;

  return res.json(sendData);
};

module.exports = {
  ErrorResponse,
  SuccessResponse,
};

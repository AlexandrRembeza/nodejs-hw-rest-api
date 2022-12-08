const { MyAPI, WrongParametersError } = require('./errors');

const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const notFoundError = (_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Invalid route',
    data: 'Not found',
  });
};

const errorHandler = (error, _, res, __) => {
  if (error instanceof MyAPI) return res.status(error.status).json({ message: error.message });
  res.status(500).json({ message: error.message });
};

const throwParameterError = id => {
  throw new WrongParametersError(`Mistake, no contact with id: ${id}`);
};

module.exports = {
  asyncWrapper,
  notFoundError,
  errorHandler,
  throwParameterError,
};

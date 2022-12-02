class MyAPI extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends MyAPI {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends MyAPI {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends MyAPI {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  MyAPI,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
};

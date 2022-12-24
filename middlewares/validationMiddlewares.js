const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');

const { ValidationError } = require('../helpers/errors');
const { findUserById } = require('../service/userServices');
const { NotAuthorizedError } = require('../helpers/errors');
require('dotenv').config();

const isValidId = ({ params: { contactId } }, _, next) => {
  if (!isValidObjectId(contactId)) {
    next(new ValidationError(`id:'${contactId}' is not correct`));
  }
  next();
};

const bodyValidation = schema => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).json({ message: 'missing fields' });

    const { error } = schema.validate(req.body);
    if (error) next(new ValidationError(error.details[0].message));
    next();
  };
};

const authMiddleware = async (req, _, next) => {
  if (!req.headers.authorization) return next(new NotAuthorizedError('Please, provide a token'));

  const [, token] = req.headers.authorization.split(' ');
  if (!token) return next(new NotAuthorizedError('Please, provide a token'));

  const { id } = jwt.decode(token, process.env.SECRET);
  if (!id) return next(new NotAuthorizedError('Unvalid token'));

  const user = await findUserById(id);
  if (!user) return next(new NotAuthorizedError(`Not authorized`));

  req.token = token;
  req.user = user;
  next();
};

module.exports = {
  isValidId,
  bodyValidation,
  authMiddleware,
};

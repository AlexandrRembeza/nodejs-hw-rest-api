const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler, notFoundError } = require('./helpers/apiHelpers');

const userRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);

app.use(notFoundError);
app.use(errorHandler);

module.exports = app;

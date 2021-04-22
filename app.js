require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const NotFoundError = require('./errors/not-found-err');

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Expose-Headers', 'Set-Cookie');
  res.append('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.append('Access-Control-Allow-Headers', 'Origin, X-Requ  ested-With, Content-Type, Accept, Set-Cookie');

  next();
});

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (statusCode) {
    res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }

  next();
});

app.listen(PORT);

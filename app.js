require('dotenv').config();

const express = require('express');

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');
const { login, createUser } = require('./controllers/users');

const { createUserValidation, loginValidation } = require('./middlewares/celebrate');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use(router);

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (statusCode) {
    res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }

  next();
});

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);

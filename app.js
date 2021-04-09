require('dotenv').config();

const express = require('express');

const { PORT, MONGODB_URL } = process.env;
const mongoose = require('mongoose');
const router = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');
const { login, createUser } = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(router);

app.use('*', (req, res) => {
  throw new NotFoundError('Страница не найдена');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (statusCode) {
    res.status(statusCode).send({ message : statusCode === 500 ? "На сервере произошла ошибка" : message});
  }
});


mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);

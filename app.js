const express = require('express');

const { PORT = 4000 } = process.env;
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes');
const { notFoundError } = require('./errors/errors');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '605c5ca22888a053884fd157',
  };
  next();
});

app.use(router);

app.use('*', (req, res) => {
  res.status(404).send(notFoundError('Страница не найдена'));
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);

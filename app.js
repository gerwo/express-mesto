const express = require('express');
const {PORT=4000} = process.env;
const mongoose = require('mongoose');
const router = require('./routes');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router)

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});



app.listen(PORT, () => {
  console.log("Listen")
});
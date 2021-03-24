const express = require('express');
const {PORT=4000} = process.env;
const mongoose = require('mongoose');
const app = express();


app.get('/', (req, res)=> {
  res.send('!!!!!')
})

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {

});



app.listen(PORT, () => {
  console.log("Listen")
});
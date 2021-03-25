const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    minlength : 2,
    maxlength : 30
  },
  about : {
    type : String,
    required : true,
    minlength : 2,
    maxlength : 30
  },
  avatar : {
    type : String,
    required : true,
    default: 'https://proprikol.ru/wp-content/uploads/2020/02/kartinki-na-avatarku-dlya-parnej-i-muzhchin-8.jpeg'
  }
})

module.exports = mongoose.model('user', userSchema);
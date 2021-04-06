const mongoose = require('mongoose');
const validator =  require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },

  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },

  email : {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  password : {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/.test(value),
    },
  },
});

module.exports = mongoose.model('user', userSchema);

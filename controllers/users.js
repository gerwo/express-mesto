const User = require('../models/user');
const { badRequestError, notFoundError } = require('../errors/errors');

const createUser = (req, res) => {
  const data = { ...req.body };

  User.create(data)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (error.message === 'NotFound') {
        res.status(404).send(notFoundError('Пользователь по указанному _id не найден'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (error.message === 'NotFound') {
        res.status(404).send(notFoundError('Пользователь по указанному _id не найден'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((avatar) => {
      res.send(avatar);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при обновлении аватара'));
      } else if (error.message === 'NotFound') {
        res.status(404).send(notFoundError('Пользователь по указанному _id не найден.'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};

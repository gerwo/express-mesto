const User = require('../models/user');
const { badRequestError, notFoundError } = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send(badRequestError('Ошибка по умолчанию'));
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send(notFoundError('Пользователь по указанному _id не найден.'));
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500).send(badRequestError('Ошибка по умолчанию'));
    });
};

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
        res.status(500).send(badRequestError('Ошибка по умолчанию'));
      }
    });
};

const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send(notFoundError('Пользователь по указанному _id не найден.'));
      }

      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        res.status(500).send(badRequestError('Ошибка по умолчанию'));
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = { ...req.body };

  res.send(avatar);

  User.findByIdAndUpdate(userId, { avatar })
    .then((avatar) => {
      if (!avatar) {
        res.status(404).send(notFoundError('Пользователь по указанному _id не найден.'));
      }

      res.send(avatar);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при обновлении аватара'));
      } else {
        res.status(500).send(badRequestError('Ошибка по умолчанию'));
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

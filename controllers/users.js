const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new Error();
      }
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error();
      }

      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const data = { ...req.body };

  User.create(data)
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      res.send(user);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new Error();
      }

      res.send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = { ...req.body };

  res.send(avatar);

  User.findByIdAndUpdate(userId, { avatar })
    .then((avatar) => {
      if (!avatar) {
        throw new Error();
      }

      res.send(avatar);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};

const User = require('../models/user');

const getUser = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
}

const getUserById = (req, res) => {
  const {id} = req.params;

  User.findById(id)
    .then((user) => {
      res.send(user)
    })
}

const createUser = (req, res) => {

  const data = {...req.body};

  User.create(data)
    .then((user) => {
      res.send(user)
    })
}

const updateUserProfile = (req, res) => {
  const data = {...req.body};

  User.updateOne(data)
    .then((user) => {
      res.send(user)
    })
}

const updateUserAvatar = (req, res) => {
  const data = {...req.body};

  User.updateOne(data)
    .then((user) => {
      res.send(user)
    })
}

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar
}
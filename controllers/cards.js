const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards)
    })
}

const createCard = (req, res) => {

}

const deleteCard = (req, res) => {

}

const addLike = (req, res) => {

}

const deleteLike = (req, res) => {

}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike
}
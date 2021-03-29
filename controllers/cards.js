const Card = require('../models/card');
const { badRequestError, notFoundError } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = { ...req.body };

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndDelete({ _id: id })
    .orFail(new Error('NotFound'))
    .then((removedCard) => {
      res.send(removedCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(400).send(badRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (error.message === 'NotFound') {
        res.status(404).send(notFoundError('Карточка с указанным _id не найдена'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const likeCard = (req, res) => {
  const id = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new Error('NotFound'))
    .then((addLike) => {
      res.send(addLike);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(400).send(badRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (error.message === 'NotFound') {
        res.status(404).send(notFoundError('Карточка с указанным _id не найдена'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

const dislikeCard = (req, res) => {
  const id = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
    .orFail(new Error('NotFound'))
    .then((deleteLike) => {
      res.send(deleteLike);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(400).send(badRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (error.message === 'NotFound') {
        res.status(404).send(notFoundError('Карточка с указанным _id не найдена'));
      } else {
        res.status(500).send(badRequestError('На сервере произошла ошибка'));
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

const Card = require('../models/card');
const { badRequestError, notFoundError } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send(badRequestError('Ошибка по умолчанию'));
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
        res.status(500).send(badRequestError('Ошибка по умолчанию'));
      }
    });
};

const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate({ _id: id })
    .then((removedCard) => {
      if (!removedCard) {
        res.status(404).send(notFoundError('Карточка с указанным _id не найдена'));
      }
      res.send(removedCard);
    })
    .catch(() => {
      res.status(500).send(badRequestError('Ошибка по умолчанию'));
    });
};

const likeCard = (req, res) => {
  const id = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((addLike) => {
      res.send(addLike);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        res.status(500).send(badRequestError('Ошибка по умолчанию'));
      }
    });
};

const dislikeCard = (req, res) => {
  const id = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
    .then((deleteLike) => {
      res.send(deleteLike);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(badRequestError('Переданы некорректные данные для снятия лайка.'));
      } else {
        res.status(500).send(badRequestError('Ошибка по умолчанию'));
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

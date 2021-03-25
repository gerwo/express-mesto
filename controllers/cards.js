const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new Error();
      }
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = { ...req.body };

  Card.create({ name, link, owner: userId })
    .then((card) => {
      if (!card) {
        throw new Error();
      }
      res.send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new Error();
      }

      Card.deleteOne({ _id: id })
        .then((removedCard) => {
          res.send(removedCard);
        });
    })
    .catch(next);
};

const likeCard = (req, res) => {
  const id = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
    { new: true },
  ).then((ok) => {
    if (!ok) {
      throw new Error();
    }
    res.send(ok);
  });
};

const dislikeCard = (req, res) => {
  const id = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((ok) => {
      if (!ok) {
        throw new Error();
      }
      res.send(ok);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

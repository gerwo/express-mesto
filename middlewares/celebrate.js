const { celebrate, Joi } = require('celebrate');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).messages({
      'string.min': 'минимальная длина пароля 8 символов',
    }),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .pattern(/^(https?\:\/\/)?[a-z0-9-_#@\',;=*+()&$![\]~:?.\/]*\.(jpg|jpeg|png|gif)$/i),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).messages({
      'string.min': 'минимальная длина пароля 8 символов',
    }),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(/^(https?\:\/\/)?[a-z0-9-_#@\',;=*+()&$![\]~:?.\/]*\.(jpg|jpeg|png|gif)$/i)
      .required(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi
      .string()
      .required()
      .pattern(/^(https?\:\/\/)?[a-z0-9-_#@\',;=*+()&$![\]~:?.\/]*\.(jpg|jpeg|png|gif)$/i),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const changeCardLikeStatus = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  getUserByIdValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  changeCardLikeStatus,
};

import Joi from "joi";

const allowedCategories = ['סיפורת', 'עיון', 'ילדים', 'קודש', 'היסטוריה'];

export const createBookValidation=Joi.object({
  name: Joi.string().trim().min(2).max(20).required(),
  price: Joi.number().min(0).required(),
  categories: Joi.array()
    .items(Joi.string().valid(...allowedCategories))
    .min(1)
    .required(),
  author: Joi.object({
    name: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().trim().lowercase().email().required()
  }).required()
});

export const updateBookValidation = Joi.object({
    name: Joi.string().trim().min(2).max(20),
    price: Joi.number().min(0),
    categories: Joi.array()
      .items(Joi.string().valid(...allowedCategories))
      .min(1),
    author: Joi.object({
      name: Joi.string().trim(),
      phone: Joi.string().trim(),
      email: Joi.string().trim().lowercase().email()
    })
  }).min(1);
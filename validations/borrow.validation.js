import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const borrowBookValidation = Joi.object({
  bookId: Joi.string().pattern(objectIdPattern).required(),
  userId: Joi.string().pattern(objectIdPattern).required(),
  returnDate: Joi.date().iso().greater('now').required()
});
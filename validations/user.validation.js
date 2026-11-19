import Joi from "joi";
const israeliPhoneRegex = /^(?:(?:-?0[2489]-?\d{7})|(?:-?0[57][0-9]-?\d{7})|(?:\+?972-?[2489]-?\d{7})|(?:\+?972-?[57][0-9]-?\d{7}))$/;
export const signUpValidation= Joi.object({

    name:Joi.string().trim().min(2).max(30).required(),
    phone:Joi.string().trim().pattern(israeliPhoneRegex).required(),
    email:Joi.string().trim().lowercase().email().required(),
    password:Joi.string().min(4).max(15).required()
});

export const signInValidation=Joi.object({
    email:Joi.string().trim().lowercase().email().required(),
    password:Joi.string().min(4).max(15).required()

});
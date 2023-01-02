const Joi = require('joi');

const addContactValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .pattern(/^\S/, "Mustn't be spaces at the start and end of the name")
    .pattern(/\S$/, "Mustn't be spaces at the start and end of the name")
    .required(),
  email: Joi.string()
    .pattern(/^\S/, "Mustn't be spaces at the start and end of the name")
    .pattern(/\S$/, "Mustn't be spaces at the start and end of the name")
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\w{3}\)\s\w{3}-\w{4}$/, 'Unvalid number')
    .required(),
  favorite: Joi.boolean().optional(),
});

const updateContactValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .pattern(/^\S/, "Mustn't be spaces at the start and end of the name")
    .pattern(/\S$/, "Mustn't be spaces at the start and end of the name")
    .optional(),
  email: Joi.string()
    .pattern(/^\S/, "Mustn't be spaces at the start and end of the name")
    .pattern(/\S$/, "Mustn't be spaces at the start and end of the name")
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(\w{3}\)\s\w{3}-\w{4}$/, 'Unvalid number')
    .optional(),
});

const updateStatusContactValidationSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactValidationSchema,
  updateContactValidationSchema,
  updateStatusContactValidationSchema,
};

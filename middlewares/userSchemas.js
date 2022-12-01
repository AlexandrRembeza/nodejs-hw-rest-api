const Joi = require('joi');

const addUserValidationSchema = Joi.object({
  password: Joi.string()
    .min(2)
    .max(20)
    .pattern(/^\S*$/, 'Password must be without spaces')
    .required(),
  email: Joi.string()
    .pattern(/^\S/, "Mustn't be spaces at the start and end of the name")
    .pattern(/\S$/, "Mustn't be spaces at the start and end of the name")
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  subscription: Joi.string()
    .pattern(/^\S*$/, 'Subscription must be without spaces')
    .pattern(
      /\b(starter|pro|business)\b/,
      'Uncorrect value. Correct one of(starter, pro, business)'
    )
    .optional(),
});

const changeSubscriptionValidationSchema = Joi.object({
  subscription: Joi.string()
    .pattern(/^\S*$/, 'Subscription must be without spaces')
    .pattern(
      /\b(starter|pro|business)\b/,
      'Uncorrect value. Correct values: starter, pro, business'
    )
    .required(),
});

module.exports = {
  addUserValidationSchema,
  changeSubscriptionValidationSchema,
};

const Joi = require('joi');

const userSchema = Joi.object({
    user_id: Joi.string().max(20).required(),
    user_type: Joi.string().allow(null, ''),
});

module.exports = {
    userSchema,
};
const Joi = require('joi');

const messageSchema = Joi.object({
    session_id: Joi.string().allow(null, ''),
    sender: Joi.string().max(20).required(),
    recipient: Joi.string().allow(null, ''),
    message: Joi.string().max(250).required(),
});

module.exports = {
    messageSchema,
};
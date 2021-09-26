const uuid = require('uuid');
const MessageService = require('../services/Message');
const UserService = require('../services/User');

const dbConnection = require('../mongoose');
const { messageSchema } = require('../utils/MessageSchema');


exports.params = async(req, res, next, id) => {
    const messages = await MessageService.getMessagesBySessionID(id);
    if (!messages) {
        next(new Error(`no message with the session id ${id}`));
    } else {
        req.messages = messages;
        next();
    }
};

exports.index = async(req, res) => {
    // this controller gets the details of the agent making the request
    const { user_id } = req.query;
    await dbConnection();

    try {
        if (!user_id) {
            messages = await MessageService.getAllMessages({});
        } else {
            let user = await UserService.getUserByUserId(user_id);
            if (!user) {
                return res.json({
                    message: "invalid user",
                    error: true
                })
            }
            messages = await MessageService.getAllAggregatedMessages(user);
        }

        if (messages) {
            res.json({
                message: 'Messages fetched successfully!',
                data: messages,
            });
        }
    } catch (err) {
        console.log(err)
    }

};

exports.get = async(req, res, next) => {
    const { messages } = req;
    await dbConnection();

    return res.json({
        message: 'Messages fetched successfully!',
        data: messages,
    });
};


exports.create = async(req, res) => {

    let { session_id, sender, recipient, message } = req.body

    await dbConnection();

    try {
        // creating an identity for the agent
        const validatedData = await messageSchema.validateAsync(req.body);
        console.log(validatedData);

        // check if user exist
        let user = await UserService.getUserByUserId(validatedData.sender);
        if (!user) {
            return res.json({
                message: "invalid user",
                error: true
            })
        }

        if (!session_id) {
            session_id = uuid.v1() // time based
        }

        message = await MessageService.createMessage({ session_id, sender: user._id, recipient, message });

        res.json({
            message: 'Message created successfully!',
            data: message,
        });

    } catch (err) {
        res.json({
            error: true,
            message: err.message,
        });
    }
};
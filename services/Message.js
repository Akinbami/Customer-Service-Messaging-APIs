const Message = require('../models/Message');

// const socketService = require('./Socket');

const M = {

    async createMessage(data) {

        let response;
        try {

            response = await Message.create(data);

        } catch (error) {
            throw new Error(error.message || 'failed to create message');
        }

        return response;
    },

    async getAllMessages({ page = 1, limit = 20, sort }) {
        let response;
        try {
            // response = await User.paginate(query, options);
            response = await Message.find();

        } catch (error) {
            throw new Error(error)
        }


        return response;
    },

    async getAllAggregatedMessages(data) {
        let response;

        try {
            // response = await User.paginate(query, options);
            response = await Message.aggregate([
                { $match: { sender: data._id } },
                {
                    $group: {
                        // Each `_id` must be unique, so if there are multiple
                        // documents with the same age, MongoDB will increment `count`.
                        _id: '$session_id',
                        count: { $sum: 1 }
                    }
                }
            ]);

        } catch (error) {
            throw new Error(error)
        }


        return response;


    },

    async getMessagesBySessionID(id) {
        let messages;
        try {
            messages = await Message.find({ session_id: id });

            if (!messages) return null;

        } catch (err) {
            throw new Error(err);
        }

        return messages;
    }

};

module.exports = M;
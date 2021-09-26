const User = require('../models/User');

// const socketService = require('./Socket');

const U = {

    async createUser(data) {
        const {
            matric,
            email,
            password
        } = data;

        let response;
        try {

            response = await User.create(data);

        } catch (error) {
            throw new Error(error.message || 'failed to create user');
        }

        return response;
    },

    async getAllUsers({ page = 1, limit = 20, sort }) {
        let response;
        try {
            // response = await User.paginate(query, options);
            response = await User.find();

        } catch (error) {
            throw new Error(error)
        }


        return response;
    },

    async getUser(id) {
        let user;
        try {
            user = await User.findById(id);

            if (!user) return null;

        } catch (err) {
            throw new Error(err);
        }

        return user;
    },

    async getUserByUserId(id) {
        let user;
        try {
            user = await User.findOne({ user_id: id });

            if (!user) return null;

        } catch (err) {
            throw new Error(err);
        }

        return user;
    },

};

module.exports = U;
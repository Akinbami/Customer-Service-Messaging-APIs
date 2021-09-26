const UserService = require('../services/User');
const dbConnection = require('../mongoose');
const { userSchema } = require('../utils/UserSchema');

const USER_CATEGORY = ["staff", "customer"]
exports.params = async(req, res, next, id) => {
    const user = await UserService.getUserByUserId(id);
    if (!user) {
        next(new Error(`no user with the id number ${id}`));
    } else {
        req.user = user;
        next();
    }
};

exports.index = async(req, res) => {
    // this controller gets the details of the agent making the request
    //   const { user } = req;
    const { page = 0, limit = 100 } = req.query;
    await dbConnection();

    try {
        const users = await UserService.getAllUsers({});

        if (users) {
            res.json({
                message: 'Users fetched successfully!',
                data: users,
            });
        }
    } catch (err) {
        console.log(err)
    }

};

exports.get = async(req, res, next) => {
    const { user } = req;
    await dbConnection();

    return res.json({
        message: 'User fetched successfully!',
        data: user,
    });
};

exports.update = async(req, res, next) => {
    const { user } = req;
    await dbConnection();

    try {
        if (!user) {
            res.json({
                message: 'user not found!!!',
            });
        } else {
            const data = req.body;

            // updating agent
            const response = await UserService.updateUser(user, data);


            res.json({
                message: 'User updated successfully!',
                data: response,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.create = async(req, res) => {


    await dbConnection();

    try {
        // creating an identity for the agent
        const validatedData = await userSchema.validateAsync(req.body);
        console.log(validatedData);

        // check if user exist
        let user = await UserService.getUserByUserId(validatedData.user_id);
        if (user) {
            return res.json({
                message: "user already exist",
                data: user
            })
        }

        user = await UserService.createUser(validatedData);

        res.json({
            message: 'User created successfully!',
            data: user,
        });

    } catch (err) {
        res.json({
            error: true,
            message: err.message,
        });
    }
};

exports.delete = async(req, res) => {
    const { user } = req;
    await dbConnection();

    const removed = await UserService.deleteUser(user.id);
    res.json({
        message: 'User deleted successfully!',
        data: removed,
    });
};
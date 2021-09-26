var config = require('./config');


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const uri = config.MONGO_URI;

const connectToDatabase = async() => {
    let isConnected;
    if (isConnected) {
        console.log('using existing database connection');
        return Promise.resolve();
    }

    console.log('using new database connection');
    const database = await mongoose.connect(uri, { useNewUrlParser: true });
    isConnected = database.connections[0].readyState;

    console.log("is connected: ", isConnected)
        // return isConnected;
};

module.exports = connectToDatabase;
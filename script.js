const csv = require('csv-parser')
const uuid = require('uuid');
const fs = require('fs')

const dbConnection = require('./mongoose');
const MessageService = require('./services/Message');
const UserService = require('./services/User');

const results = [];


fs.createReadStream('GeneralistRails_Project_MessageData.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async() => {
        console.log(results);

        // connect to db 
        await dbConnection();
        results.map(async(data, index) => {

            // check if user exists, if not, then create
            let user = await UserService.getUserByUserId(data["User ID"])
            if (!user) {
                user = await UserService.createUser({ user_id: data["User ID"] })
            }

            // create the message
            let session_id = uuid.v1() // time based
            let message = await MessageService.createMessage({ session_id, sender: user._id, message: data["Message Body"] })
            console.log(data["User ID"], index)
        })

    });
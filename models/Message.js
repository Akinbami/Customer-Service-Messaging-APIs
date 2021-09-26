var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 2. Define the MongoDB schema for the people collection
var messageSchema = new Schema({
    session_id: {
        type: String,
        required: true,
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    message: {
        type: String,
        required: true,
    },

    is_active: {
        type: Boolean,
        required: true,
        default: false
    },

}, {
    timestamps: true,
});


// 6. Export the Person model
module.exports = mongoose.model('Message', messageSchema);
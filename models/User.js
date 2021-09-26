var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 2. Define the MongoDB schema for the people collection
var userSchema = new Schema({
    user_id: {
        type: String, //used to identify the user
        required: true,
        unique: true,
    },

    user_type: {
        type: String,
        required: true,
        default: "customer" // this differentiates the kind of users (set to staff if provided)
    },

    is_available: {
        type: Boolean, //used to detect when a staff is available if usertype equals staff
        required: true,
        default: true
    },

}, {
    timestamps: true,
});


// 6. Export the Person model
module.exports = mongoose.model('User', userSchema);
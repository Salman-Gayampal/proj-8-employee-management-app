const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    // fullName (String)
    // username (String)
    // password (hash)
    // date_created [datetime], date_updated (datetime)


    fullName: {
        type: String,
        required: [true, "fullName is required."]
    },
    username: {
        type: String,
        required: [true, "username is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date,
        default: new Date()
    }

});

module.exports = mongoose.model("User", userSchema);
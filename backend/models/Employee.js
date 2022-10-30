const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    // Id [auto increment], 
    // firstName [string], 
    // lastName [string], 
    // position [string], 
    // dateHire [datetime], 
    // dateCreated [datetime], 
    // dateUpdated [datetime], 
    // dateDeleted [datetime]
 
    firstName: {
        type: String,
		required: [true, "Please enter the employee's first name."]
    },
    lastName: {
        type: String,
		required: [true, "Please enter the employee's last name."]
    },
    position: {
        type: String,
		required: [true, "Please enter the employee's position."]
    },
    dateHire: {
        type: String,
		required: [true, "Please enter the employee's hired date."]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date,
        default: null
    },
    dateDeleted: {
        type: Date,
        default: null
    }

});

module.exports = mongoose.model("Employee", employeeSchema);
const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');

// VERIFY USERNAME CONTROLLER
module.exports.checkUsernameExists = (reqBody) => {

	return User.find({username: reqBody.username}).then(result => {
		
		if (result.length > 0) {
			return true

		} else {
			return false
		}

	})
};

// REGISTER CONTROLLER
module.exports.registerUser = (reqBody) => {

    let newUser = new User({
		fullName: reqBody.fullName,
		username: reqBody.username,
		password: bcrypt.hashSync(reqBody.password, 10) 
		
	})

	return newUser.save().then((user, error) => {
		
		if(error) {
			return false

		} else {
			return true
		}

	})
};

// USER AUTHENTICATION  LOGIN
module.exports.loginUser = (reqBody) => {
    return User.findOne({ username: reqBody.username }).then(result => {
        if (result == null) {
            return false // Please enter your username`
        } else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
            if (isPasswordCorrect) {
                return { access: auth.createAccessToken(result) }
            } else {
                return false //Your username and password doesn't match.
            }
        }
    })
};

// RETRIEVE USER DETAILS
module.exports.getUserDetails = (userData) => {
    return User.findById(userData.id)
        .then(result => {
            console.log(userData)
            if (result == null) {
                return false
            } else {
                console.log(result)
                result.password = "***********";
                return result
            }
        })
};

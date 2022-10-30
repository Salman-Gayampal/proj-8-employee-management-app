const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

// VERIFY USERNAME ROUTE
router.post("/checkUsername", (req, res) => {
    userController.checkUsernameExists(req.body).then(resultFromController => res.send(resultFromController));
})

// REGISTER ROUTE
router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
});

// RETRIEVE USER DETAILS
router.get("/details", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization)
    console.log(userData)

    userController.getUserDetails({ id: userData.id })
        .then(resultFromController =>
            res.send(resultFromController))
});



module.exports = router;
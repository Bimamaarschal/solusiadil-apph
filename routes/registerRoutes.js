// registerRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controllers/registerController');

function checkLoggedIn(req, res, next) {
    if (req.session.user) {
        res.redirect('/beranda');
    } else {
        next();
    }
}

router.post('/register', registerController.registerUser);

router.get('/register',  checkLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

module.exports = router;

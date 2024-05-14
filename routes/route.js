const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/registerController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html')); 
});
router.get('/beranda', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'beranda.html')); 
});
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

module.exports = router;

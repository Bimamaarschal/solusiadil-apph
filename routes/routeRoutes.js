
const express = require('express');
const router = express.Router();
const path = require('path');

function checkLoggedIn(req, res, next) {
    if (req.session.user) {
        res.redirect('/beranda');
    } else {
        next();
    }
}


router.get('/blog',  (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'blog.html'));
});

router.get('/ajuan',  (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'ajuan.html'));
});

router.get('/jdih', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'jdih.html'));
});

router.get('/kontak', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'kontak.html'));
});


router.get('/aturan', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'aturan.html'));
});


module.exports = router;
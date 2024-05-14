
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



router.get('/tentangkami', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'tentangkami.html'));
});

router.get('/blog',  (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'blog.html'));
});

router.get('/konsultasi',  (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'konsultasi.html'));
});

router.get('/layanan', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'layanan.html'));
});

router.get('/kontak', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'kontak.html'));
});


router.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'faq.html'));
});

router.get('/gabung', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'gabung.html'));
});

module.exports = router;

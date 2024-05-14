const path = require('path');

exports.getBeranda = (req, res) => {
    if (req.session.user) {
        const filePath = path.join(__dirname, '../public', 'beranda.html');
        res.sendFile(filePath);
    } else {
        res.redirect('/masuk');
    }
};
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const cekLoginMasuk = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, apph) => {
        if (err) {
          return res.redirect('/masuk');
        }
        req.apph = apph;
        next();
      });
    } else {
      res.redirect('/masuk');
    }
  };

module.exports = cekLoginMasuk;

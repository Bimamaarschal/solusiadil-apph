const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

const cekJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, apph) => {
      if (err) {
        console.error('Error verifying JWT:', err.message);
        req.authError = 'Gagal verifikasi token. Silakan masuk kembali.';
        return res.redirect('/tampiljwt'); // Redirect to the desired error page
      } else {
        req.apph = apph;
        return next();
      }
    });
  } else {
    req.authError = 'Token tidak ditemukan. Silakan masuk kembali.';
    return res.redirect('/tampiljwt'); // Redirect to the desired error page
  }
};

module.exports = cekJWT;
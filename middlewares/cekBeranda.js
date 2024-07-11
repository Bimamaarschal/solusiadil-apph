const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const cekBeranda = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, apph) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.apph = apph;
      next();
    });
  } else {
    res.redirect('/masuk');
  }
};

module.exports = cekBeranda;

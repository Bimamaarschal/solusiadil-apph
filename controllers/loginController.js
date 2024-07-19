const axios = require('axios');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const randomStringLength = 50;
const randomString = generateRandomString(randomStringLength);


exports.loginApph = async (req, res) => {
  try {
    const { id_apph, password } = req.body;
    const response = await axios.post(
      'https://solusiadil-api.vercel.app/apph/login',
      { id_apph, password }
    );

    if (response.data.message === 'Login successful' && response.data.apphData) {
      const apphData = response.data.apphData;

      const token = jwt.sign(
        {
          nama_apph: apphData.nama_apph,
          id_apph: apphData.id_apph,
          nik: apphData.nik
        },
        JWT_SECRET,
        { expiresIn: '3h' }
      );
      res.cookie('token', token, { httpOnly: true });
      res.redirect(`/beranda?bima-safety-key=${randomString}&${id_apph}&${randomString}`);
    } else {
      res.send(`
        <html>
          <head>
            <title>Login Gagal</title>
            <script>
              alert("Apph Gagal Login karena data pengguna tidak valid");
              window.location.href = "/masuk";
            </script>
          </head>
          <body>
            <p>Kembalikan...</p>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>Login Gagal</title>
          <script>
            alert("Apph Gagal Login karena ${error.message}");
            window.location.href = "/masuk";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.logoutApph = (req, res) => {
  res.clearCookie('token');
  res.redirect("/");
};

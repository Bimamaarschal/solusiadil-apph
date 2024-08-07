const axios = require('axios');

exports.Lupa = async (req, res) => {
  res.render("password/lupa");
};

exports.cekLupa = async (req, res) => {
  const { id_apph, nik } = req.body;
  try {
    const response = await axios.get(`https://solusiadil-api.vercel.app/apph/idapph/${id_apph}`);
    const data = response.data;
    const apphData = Object.values(data).find(item => item.id_apph === id_apph);
    if (apphData && apphData.nik === nik) {
      res.render('password/passwordbaru', { id_apph, nik });
    } else {
      res.status(400).send('ID APPH atau NIK tidak cocok');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan pada server');
  }
};

exports.updatePassword = async (req, res) => {
  const { id_apph, nik, password } = req.body;
  try {
    await axios.put(`https://solusiadil-api.vercel.app/apph/idapph/${id_apph}`, { nik, password });
    res.send(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Update Password</title>
        <script>
          function showAlertAndRedirect() {
            alert('Password berhasil diperbarui'); // Menampilkan popup
            window.location.href = 'masuk'; // Ganti dengan URL halaman masuk
          }
          window.onload = showAlertAndRedirect;
        </script>
      </head>
      <body>
        <!-- Halaman kosong, karena semua logika ada di JavaScript -->
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan pada server');
  }
};

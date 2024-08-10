const axios = require('axios');
const path = require('path');

exports.aturanbaruData = async (req, res) => {
  const {
    email = "Kosong",
    gambar = "Kosong",
    id_admin = "Kosong",
    id_apph = "Kosong",
    id_lai = "Kosong",
    id_uu = "Kosong",
    isi_1,
    judul,
    keterangan,
    nama_lai,
    nama_apph,
    status = "Terbit",
    tanggal,
    undangundang,
  } = req.body;

  const filePath = req.file ? req.file.path : null;
  const isi_2 = filePath ? path.posix.relative('public', filePath).replace(/\\/g, '/') : null;
  if (!isi_2) {
    return res.status(400).send('File PDF diperlukan');
  }
  try {
    const response = await axios.post(
      "https://solusiadil-api.vercel.app/undangundang",
      {
        email,
        gambar,
        id_admin,
        id_apph,
        id_lai,
        id_uu,
        id_uu,
        isi_1,
        isi_2,
        judul,
        keterangan,
        nama_lai,
        nama_apph,
        status,
        tanggal,
        undangundang,
      }
    );
    if (response.status === 201) {
      res.send(`
        <html>
          <head>
            <title>aturan Data Success</title>
            <script>
              alert("aturan berhasil diajukan, akan berpindah ke halaman Awal");
              window.location.href = "/dataaturan";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal menyimpan aturan Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>aturan Gagal</title>
          <script>
            alert("Gagal mengirim data karena ${error.message}");
            window.location.href = "/tulisaturan";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.getDataaturan = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/undangundang');
      const aturanData = Object.values(response.data);
  
      res.render('aturan/dataaturan', { aturanData, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching aturan data:', error);
      res.status(500).send('Error fetching aturan data');
    }
  };

  exports.getTulisaturan = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/undangundang');
      const aturan = Object.values(response.data);
  
      res.render('aturan/tulisaturan', { aturan, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching aturan data:', error);
      res.status(500).send('Error fetching aturan data');
    }
  };

  exports.aturanlihatData = async (req, res) => {
    try {
      const id_uu = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/undangundang/idundangundang/${id_uu}`);
      const aturanData = response.data;
      const formattedaturan = Object.values(aturanData)[0];
      if (!formattedaturan) {
        throw new Error('Data aturan tidak ditemukan');
      }
      res.render('aturan/lihataturan', { aturan: formattedaturan, id_apph, nama_apph });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data aturan.');
    }
  };

  exports.aturanbacaData = async (req, res) => {
    try {
      const id_uu = req.query.id_uu;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/undangundang/idundangundang/${id_uu}`);
      const response2 = await axios.get('https://solusiadil-api.vercel.app/undangundang');
      const aturanData2 = Object.values(response2.data);
      const aturanData = response.data;
      const formattedaturan = Object.values(aturanData)[0];
      if (!formattedaturan) {
        throw new Error('Data aturan tidak ditemukan');
      }
      res.render('aturan/bacaaturan', { aturan: formattedaturan, aturanData2, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data aturan.');
    }
  };
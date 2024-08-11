const axios = require('axios');
const path = require('path');

exports.aturanbaruData = async (req, res) => {
  const {
    id_apph,
    id_uu,
    jenis,
    judul,
    keterangan,
    nama_apph,
    no,
    oleh,
    status = "Terbit",
    tahun,
    tanggal,
    tentang,
  } = req.body;

  const filePath = req.file ? req.file.path : null;
  const dokumen = filePath ? path.posix.relative('public', filePath).replace(/\\/g, '/') : null;
  if (!dokumen) {
    return res.status(400).send('File PDF diperlukan');
  }
  try {
    const response = await axios.post(
      "https://solusiadil-api.vercel.app/undangundang",
      {
        dokumen,
        id_apph,
        id_uu,
        jenis,
        judul,
        keterangan,
        nama_apph,
        no,
        oleh,
        status,
        tahun,
        tanggal,
        tentang,
      }
    );
    if (response.status === 201) {
      res.send(`
        <html>
          <head>
            <title>Peraturan Data Success</title>
            <script>
              alert("Peraturan berhasil diajukan, akan berpindah ke halaman Awal");
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
          <title>Peraturan Gagal</title>
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
      res.status(500).send('Terjadi kesalahan dalam mengambil data Peraturan.');
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
      res.status(500).send('Terjadi kesalahan dalam mengambil data Peraturan.');
    }
  };

  exports.hapusData = async (req, res) => {
    try {
      const id_uu = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.delete(`https://solusiadil-api.vercel.app/undangundang/idundangundang/${id_uu}`);
      
      if (response.status === 200) {
        res.redirect('/dataaturan');
      } else {
        throw new Error('Gagal menghapus data');
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam menghapus data Peraturan.');
    }
  };
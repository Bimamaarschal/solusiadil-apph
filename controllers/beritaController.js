const axios = require('axios');

exports.beritabaruData = async (req, res) => {
  const {
    id_apph,
    id_berita,
    isi,
    judul,
    keterangan,
    nama_apph,
    status = "Terbit",
    tag,
    tanggal,
  } = req.body;

  try {
    const response = await axios.post(
      "https://solusiadil-api.vercel.app/berita",
      {
        id_apph,
        id_berita,
        isi,
        judul,
        keterangan,
        nama_apph,
        status,
        tag,
        tanggal,
      }
    );

    if (response.status === 201) {
      res.send(`
        <html>
          <head>
            <title>Berita Data Success</title>
            <script>
              alert("Berita berhasil diajukan, akan berpindah ke halaman Awal");
              window.location.href = "/databerita";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal menyimpan berita Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>Berita Gagal</title>
          <script>
            alert("Gagal mengirim data karena ${error.message}");
            window.location.href = "/tulisberita";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};


exports.getDataberita = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/berita');
      const beritaData = Object.values(response.data);
  
      res.render('berita/databerita', { beritaData, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching berita data:', error);
      res.status(500).send('Error fetching berita data');
    }
  };

  exports.getTulisberita = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/berita');
      const berita = Object.values(response.data);
  
      res.render('berita/tulisberita', { berita, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching berita data:', error);
      res.status(500).send('Error fetching berita data');
    }
  };

  exports.beritalihatData = async (req, res) => {
    try {
      const id_berita = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/berita/idberita/${id_berita}`);
      const beritaData = response.data;
      const formattedberita = Object.values(beritaData)[0];
      if (!formattedberita) {
        throw new Error('Data berita tidak ditemukan');
      }
      res.render('berita/lihatberita', { berita: formattedberita, id_apph, nama_apph });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data Berita.');
    }
  };

  exports.beritabacaData = async (req, res) => {
    try {
      const id_berita = req.query.id_berita;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/berita/idberita/${id_berita}`);
      const response2 = await axios.get('https://solusiadil-api.vercel.app/berita');
      const beritaData2 = Object.values(response2.data);
      const beritaData = response.data;
      const formattedberita = Object.values(beritaData)[0];
      if (!formattedberita) {
        throw new Error('Data berita tidak ditemukan');
      }
      res.render('berita/bacaberita', { berita: formattedberita, beritaData2, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data Berita.');
    }
  };

  exports.hapusData = async (req, res) => {
    try {
      const id_berita = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.delete(`https://solusiadil-api.vercel.app/berita/idberita/${id_berita}`);
      
      if (response.status === 200) {
        res.redirect('/databerita');
      } else {
        throw new Error('Gagal menghapus data');
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam menghapus data Berita.');
    }
  };
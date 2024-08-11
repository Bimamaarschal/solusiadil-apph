const axios = require('axios');
const path = require('path');

exports.panduanbaruData = async (req, res) => {
  const {
    email = "Kosong",
    gambar = "Kosong",
    id_admin = "Kosong",
    id_apph,
    id_lai = "Kosong",
    id_panduan,
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
      "https://solusiadil-api.vercel.app/panduan",
      {
        email,
        gambar,
        id_admin,
        id_apph,
        id_lai,
        id_panduan,
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
            <title>Panduan Data Success</title>
            <script>
              alert("Panduan berhasil diajukan, akan berpindah ke halaman Awal");
              window.location.href = "/datapanduan";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal menyimpan panduan Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>Panduan Gagal</title>
          <script>
            alert("Gagal mengirim data karena ${error.message}");
            window.location.href = "/tulispanduan";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.getDatapanduan = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/panduan');
      const panduanData = Object.values(response.data);
  
      res.render('panduan/datapanduan', { panduanData, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching panduan data:', error);
      res.status(500).send('Error fetching panduan data');
    }
  };

  exports.getTulispanduan = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/panduan');
      const panduan = Object.values(response.data);
  
      res.render('panduan/tulispanduan', { panduan, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching panduan data:', error);
      res.status(500).send('Error fetching panduan data');
    }
  };

  exports.panduanlihatData = async (req, res) => {
    try {
      const id_panduan = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/panduan/idpanduan/${id_panduan}`);
      const panduanData = response.data;
      const formattedpanduan = Object.values(panduanData)[0];
      if (!formattedpanduan) {
        throw new Error('Data panduan tidak ditemukan');
      }
      res.render('panduan/lihatpanduan', { panduan: formattedpanduan, id_apph, nama_apph });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data panduan.');
    }
  };

  exports.panduanbacaData = async (req, res) => {
    try {
      const id_panduan = req.query.id_panduan;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/panduan/idpanduan/${id_panduan}`);
      const response2 = await axios.get('https://solusiadil-api.vercel.app/panduan');
      const panduanData2 = Object.values(response2.data);
      const panduanData = response.data;
      const formattedpanduan = Object.values(panduanData)[0];
      if (!formattedpanduan) {
        throw new Error('Data panduan tidak ditemukan');
      }
      res.render('panduan/bacapanduan', { panduan: formattedpanduan, panduanData2, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data panduan.');
    }
  };
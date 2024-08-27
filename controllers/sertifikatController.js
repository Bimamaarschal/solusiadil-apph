const axios = require('axios');

exports.sertifikatbaruData = async (req, res) => {
  const {
    id_sertifikat,
    id_apph,
    nama_apph,
    tanggal,
    judul = "Sertifikat Penyelesaian",
    keterangan = "Kosong",
    status = "Diajukan",
  } = req.body;

  try {
    let existingSertifikat = [];

    try {
      const existingResponse = await axios.get(
        `https://solusiadil-api.vercel.app/sertifikat/idapph/${id_apph}`
      );
      existingSertifikat = Object.values(existingResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        existingSertifikat = [];
      } else {
        throw error;
      }
    }
    const hasDiajukan = existingSertifikat.some(
      (sertifikat) => sertifikat.status === "Diajukan"
    );
    if (hasDiajukan) {
      throw new Error("Tidak bisa menambah data karena sudah ada sertifikat dengan status 'Diajukan'.");
    }

    // Melanjutkan untuk menambahkan data baru
    const response = await axios.post(
      "https://solusiadil-api.vercel.app/sertifikat",
      {
        id_sertifikat,
        id_apph,
        nama_apph,
        tanggal,
        judul,
        keterangan,
        status,
      }
    );

    if (response.status === 201) {
      res.send(`
        <html>
          <head>
            <title>Sertifikat Data Success</title>
            <script>
              alert("Sertifikat berhasil diajukan, akan berpindah ke halaman Awal");
              window.location.href = "/datasertifikat";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal menyimpan sertifikat Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>Sertifikat Gagal</title>
          <script>
            alert("${error.message}");
            window.location.href = "/datasertifikat";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.getDatasertifikat = async (req, res) => {
  if (req.apph) {
    const { id_apph, nama_apph } = req.apph;
    try {
      const response = await axios.get(
        `https://solusiadil-api.vercel.app/sertifikat/idapph/${id_apph}`
      );
      const sertifikatObj = response.data;
      const sertifikatData = sertifikatObj ? Object.values(sertifikatObj) : [];
      
      res.render('sertifikat/datasertifikat', {
        sertifikatData,
        id_apph,
        nama_apph,
      });
    } catch (error) {
      console.error('Error fetching sertifikat data');
      res.render('sertifikat/datasertifikat', {
        sertifikatData: [],
        id_apph,
        nama_apph,
      });
    }
  } else {
    res.redirect("/masuk");
  }
};

  exports.getTulissertifikat = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/sertifikat');
      const sertifikat = Object.values(response.data);
  
      res.render('sertifikat/tulissertifikat', { sertifikat, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching sertifikat data:', error);
      res.status(500).send('Error fetching sertifikat data');
    }
  };

  exports.sertifikatlihatData = async (req, res) => {
    try {
      const id_sertifikat = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
      const sertifikatData = response.data;
      const formattedsertifikat = Object.values(sertifikatData)[0];
      if (!formattedsertifikat) {
        throw new Error('Data sertifikat tidak ditemukan');
      }
      res.render('sertifikat/lihatsertifikat', { sertifikat: formattedsertifikat, id_apph, nama_apph });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data sertifikat.');
    }
  };

  exports.sertifikatlihatData2 = async (req, res) => {
    try {
      const id_sertifikat = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
      const sertifikatData = response.data;
      const formattedsertifikat = Object.values(sertifikatData)[0];
      if (!formattedsertifikat) {
        throw new Error('Data sertifikat tidak ditemukan');
      }
      res.render('sertifikat/pengajuansertifikat', { sertifikat: formattedsertifikat, id_apph, nama_apph });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data sertifikat.');
    }
  };

  exports.sertifikatbacaData = async (req, res) => {
    try {
      const id_sertifikat = req.query.id_sertifikat;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
      const response2 = await axios.get('https://solusiadil-api.vercel.app/sertifikat');
      const sertifikatData2 = Object.values(response2.data);
      const sertifikatData = response.data;
      const formattedsertifikat = Object.values(sertifikatData)[0];
      if (!formattedsertifikat) {
        throw new Error('Data sertifikat tidak ditemukan');
      }
      res.render('sertifikat/bacasertifikat', { sertifikat: formattedsertifikat, sertifikatData2, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data sertifikat.');
    }
  };

  exports.hapusData = async (req, res) => {
    try {
      const id_sertifikat = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.delete(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
      
      if (response.status === 200) {
        res.redirect('/datasertifikat');
      } else {
        throw new Error('Gagal menghapus data');
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam menghapus data sertifikat.');
    }
  };
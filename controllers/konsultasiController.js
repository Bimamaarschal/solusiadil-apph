const axios = require('axios');

//Fungsi Ke Halaman Konsultasi
exports.getKonsultasi = async (req, res) => {
  try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/konsultasi');
      const konsultasiData = Object.values(response.data);
      const itemsPerPage = 15;
      const page = parseInt(req.query.page) || 1;
      const totalItems = konsultasiData.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      const sortedKonsultasiData = konsultasiData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      const paginatedKonsultasiData = sortedKonsultasiData.slice(startIndex, endIndex);
      res.render('konsultasi/konsultasi', {
          konsultasiData: paginatedKonsultasiData,
          id_apph,
          nama_apph,
          page,
          totalPages
      });
  } catch (error) {
      console.error('Error fetching konsultasi data:', error);
      res.status(500).send('Error fetching konsultasi data');
  }
};

//Fungsi Ke Halaman Detail Konsultasi
exports.getDetailKonsultasi = async (req, res) => {
    try {
      const id_konsultasi = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/konsultasi/idkonsultasi/${id_konsultasi}`);
      const konsultasiData = response.data;
      const formattedKonsultasi = Object.values(konsultasiData)[0];
      if (!formattedKonsultasi) {
        throw new Error('Data konsultasi tidak ditemukan');
      }
      res.render('konsultasi/editkonsultasi', { konsultasi: formattedKonsultasi, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data konsultasi.');
    }
  };

  //Fungsi Ke Halaman Detail Konsultasi di Tanggapi
exports.getDetailKonsultasi2 = async (req, res) => {
    try {
      const id_konsultasi = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/konsultasi/idkonsultasi/${id_konsultasi}`);
      const konsultasiData = response.data;
      const formattedKonsultasi = Object.values(konsultasiData)[0];
      if (!formattedKonsultasi) {
        throw new Error('Data konsultasi tidak ditemukan');
      }
      res.render('konsultasi/editkonsultasi2', { konsultasi: formattedKonsultasi, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data konsultasi.');
    }
  };

//Fungsi Ke Halaman Detail Konsultasi Selesai
exports.getDetailKonsultasi3 = async (req, res) => {
    try {
      const id_konsultasi = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/konsultasi/idkonsultasi/${id_konsultasi}`);
      const konsultasiData = response.data;
      const formattedKonsultasi = Object.values(konsultasiData)[0];
      if (!formattedKonsultasi) {
        throw new Error('Data konsultasi tidak ditemukan');
      }
      res.render('konsultasi/konsultasilihat', { konsultasi: formattedKonsultasi, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data konsultasi.');
    }
  };

//Fungsi Ke Halaman Konsultasi 1
exports.updateKonsultasi = async (req, res) => {
    try {
      const konsultasiId = req.body.id_konsultasi;
      const updatedData = {
        id_apph: req.body.id_apph,
        id_konsultasi: req.body.id_konsultasi,
        id_masyarakat: req.body.id_masyarakat,
        jawaban: req.body.jawaban,
        judul: req.body.judul,
        judul: req.body.judul,
        keterangan: req.body.keterangan,
        jenis: req.body.jenis,
        lanjutan1: "Belum Tersedia",
        media: "Belum Tersedia",
        nama_apph: req.body.nama_apph,
        nama_mast: req.body.nama_mast,
        calendly: req.body.calendly,
        pertanyaan: req.body.pertanyaan,
        referensi: req.body.referensi,
        status:  "Diproses",
        tanggal: req.body.tanggal,
        undangundang: req.body.undangundang,
        wilayahhukum: req.body.wilayahhukum,
      };
      await axios.put(`https://solusiadil-api.vercel.app/konsultasi/${konsultasiId}`, updatedData);
      res.redirect('konsultasi');
    } catch (error) {
      console.error('Error updating konsultasi:', error);
      res.status(500).send('Error updating konsultasi');
    }
  };

//Fungsi Ke Halaman Konsultasi 1
exports.updateKonsultasi1 = async (req, res) => {
    try {
      const status = Array.isArray(req.body.status) ? req.body.status[req.body.status.length - 1] : req.body.status;
      const keterangan = Array.isArray(req.body.keterangan) ? req.body.keterangan.join(' ') : req.body.keterangan;
      const konsultasiId1 = req.body.id_konsultasi;
      const updatedData1 = {
        id_apph: req.body.id_apph,
        id_konsultasi: req.body.id_konsultasi,
        id_masyarakat: req.body.id_masyarakat,
        jawaban: req.body.jawaban,
        judul: req.body.judul,
        keterangan: keterangan,
        jenis: req.body.jenis,
        lanjutan1: req.body.lanjutan1,
        media: "Belum Tersedia",
        calendly: req.body.calendly,
        nama_apph: req.body.nama_apph,
        nama_mast: req.body.nama_mast,
        pertanyaan: req.body.pertanyaan,
        referensi: req.body.referensi,
        status: status,
        tanggal: req.body.tanggal,
        undangundang: req.body.undangundang,
        wilayahhukum: req.body.wilayahhukum,
      };
      await axios.put(`https://solusiadil-api.vercel.app/konsultasi/${konsultasiId1}`, updatedData1);
      res.redirect('konsultasi');
    } catch (error) {
      console.error('Error updating konsultasi:', error);
      res.status(500).send('Error updating konsultasi');
    }
  };
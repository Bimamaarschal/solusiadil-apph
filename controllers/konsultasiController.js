const axios = require('axios');

exports.getKonsultasi = async (req, res) => {
    try {
      const response = await axios.get('https://solusiadil-api.vercel.app/konsultasi');
      const konsultasiData = Object.values(response.data);
  
      res.render('konsultasi', { konsultasiData });
    } catch (error) {
      console.error('Error fetching konsultasi data:', error);
      res.status(500).send('Error fetching konsultasi data');
    }
  };


  exports.getDetailKonsultasi = async (req, res) => {
    try {
      const id_konsultasi = req.query.id;
      const { id_apph, nama } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/konsultasi/idkonsultasi/${id_konsultasi}`);
      const konsultasiData = response.data;
      const formattedKonsultasi = Object.values(konsultasiData)[0];
      if (!formattedKonsultasi) {
        throw new Error('Data konsultasi tidak ditemukan');
      }
      res.render('editkonsultasi', { konsultasi: formattedKonsultasi, id_apph, nama });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data konsultasi.');
    }
  };
  
  exports.updateKonsultasi = async (req, res) => {
    try {
      const konsultasiId = req.body.id_konsultasi;
      const updatedData = {
        status: req.body.status,
        nama_mast: req.body.nama_mast,
        tanggal: req.body.tanggal,
      };
  
      await axios.put(`https://solusiadil-api.vercel.app/apph/${konsultasiId}`, updatedData);
  
      res.redirect('/konsultasi');
    } catch (error) {
      console.error('Error updating konsultasi:', error);
      res.status(500).send('Error updating konsultasi');
    }
  };
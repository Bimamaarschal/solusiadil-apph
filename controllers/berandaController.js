exports.getBeranda = (req, res) => {
    if (req.apph) {
      const nama_apph = req.apph.nama_apph;
      const idApph = req.apph.id_apph;
      const Nik = req.apph.nik;
      res.render('beranda', { nama_apph: nama_apph, idApph: idApph, Nik: Nik });
    } else {
      res.redirect('/masuk');
    }
  };
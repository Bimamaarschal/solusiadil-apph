exports.getBeranda = (req, res) => {
    if (req.apph) {
      const doc_pendukung = req.apph.doc_pendukung;
      const idApph = req.apph.id_apph;
      const Nik = req.apph.nik;
      res.render('beranda', { doc_pendukung: doc_pendukung, idApph: idApph, Nik: Nik });
    } else {
      res.redirect('/masuk');
    }
  };
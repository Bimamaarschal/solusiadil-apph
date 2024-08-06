const axios = require('axios');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/gambar");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Gambar hanya mendukung format jpeg, jpg, dan png!");
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
  fileFilter: fileFilter,
});

exports.blogbaruData = async (req, res) => {
  upload.single("gambar")(req, res, async (err) => {
    if (err) {
      return res.send(`
        <html>
          <head>
            <title>Blog gagal</title>
            <script>
              alert("Gagal mengunggah gambar: ${err}");
              window.location.href = "/tulisblog";
            </script>
          </head>
          <body>
            <p>Kembalikan...</p>
          </body>
        </html>
      `);
    }
    const {
      doc_pendukung,
      id_apph,
      id_blog,
      id_uu = "Masih kosong",
      isi,
      judul,
      nama_apph,
      status = "Diterima",
      tag = "Kosong",
      tanggal,
      undang_undang,
    } = req.body;
    const gambar = req.file ? req.file.filename : null;
    try {
      const response = await axios.post(
        "https://solusiadil-api.vercel.app/blogs",
        {
          doc_pendukung,
          id_apph,
          id_blog,
          id_uu,
          isi,
          judul,
          nama_apph,
          gambar,
          status,
          tag,
          tanggal,
          undang_undang,
        }
      );

      if (response.status === 201) {
        res.send(`
          <html>
            <head>
              <title>Blog Data Success</title>
              <script>
                alert("Blog berhasil diajukan, akan berpindah ke halaman Awal");
                window.location.href = "/datablog";
              </script>
            </head>
            <body>
              <p>Kembalikan..</p>
            </body>
          </html>
        `);
      } else {
        throw new Error("Gagal menyimpan blog Anda");
      }
    } catch (error) {
      console.error("Error:", error);
      res.send(`
        <html>
          <head>
            <title>Blog gagal</title>
            <script>
              alert("Gagal mengirim data karena ${error.message}");
              window.location.href = "/tulisblog";
            </script>
          </head>
          <body>
            <p>Kembalikan...</p>
          </body>
        </html>
      `);
    }
  });
};

exports.getDatablog = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/blogs');
      const blogData = Object.values(response.data);
  
      res.render('blog/datablog', { blogData, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };

  exports.getTulisblog = async (req, res) => {
    try {
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get('https://solusiadil-api.vercel.app/blogs');
      const blog = Object.values(response.data);
  
      res.render('blog/tulisblog', { blog, id_apph, nama_apph });
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).send('Error fetching blog data');
    }
  };

  exports.bloglihatData = async (req, res) => {
    try {
      const id_blog = req.query.id;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/blogs/idblog/${id_blog}`);
      const blogData = response.data;
      const formattedBlog = Object.values(blogData)[0];
      if (!formattedBlog) {
        throw new Error('Data blog tidak ditemukan');
      }
      res.render('blog/lihatblog', { blog: formattedBlog, id_apph, nama_apph });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data blog.');
    }
  };

  exports.blogbacaData = async (req, res) => {
    try {
      const id_blog = req.query.id_blog;
      const { id_apph, nama_apph } = req.apph;
      const response = await axios.get(`https://solusiadil-api.vercel.app/blogs/idblog/${id_blog}`);
      const response2 = await axios.get('https://solusiadil-api.vercel.app/blogs');
      const blogData2 = Object.values(response2.data);
      const blogData = response.data;
      const formattedBlog = Object.values(blogData)[0];
      if (!formattedBlog) {
        throw new Error('Data blog tidak ditemukan');
      }
      res.render('blog/bacablog', { blog: formattedBlog, blogData2, id_apph, nama_apph });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam mengambil data blog.');
    }
  };
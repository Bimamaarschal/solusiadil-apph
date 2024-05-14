
document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var id_masyarakat = "null";
  var nik = document.getElementById("nik").value;
  var nama = document.getElementById("nama").value;
  var tgl_lahir = document.getElementById("tgl_lahir").value;
  var jenis_kelamin = document.getElementById("jenis_kelamin").value;
  var alamat = document.getElementById("alamat").value;
  var no_tlp = document.getElementById("no_tlp").value;
  var foto = "null";
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var data = {
    id_masyarakat: id_masyarakat,
    nik: nik,
    nama: nama,
    tgl_lahir: tgl_lahir,
    jenis_kelamin: jenis_kelamin,
    alamat: alamat,
    no_tlp: no_tlp,
    foto: foto,
    email: email,
    password: password,
  };

  fetch(
    "https://solusiadil-api.vercel.app/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Internet Bermasalah.");
    })
    .then((jsonResponse) => {
      console.log("Registrasi berhasil:", jsonResponse);
      document.getElementById("successPopup").style.display = "block";
      var count = 7;
      var countdownElem = document.getElementById("countdown");
      var countdownInterval = setInterval(function() {
        count--;
        countdownElem.innerHTML = "Halaman akan dialihkan dalam " + count + " detik. Untuk masuk SolusiAdil";
        if (count <= 0) {
          clearInterval(countdownInterval);
          document.getElementById("successPopup").style.display = "none";
          window.location.href = "./masuk";
        }
      }, 1000);
    })
    .catch((error) => {
      console.error("Registrasi gagal:", error);
      alert("Registrasi gagal. Terjadi kesalahan: " + error.message);
    });
});
document.addEventListener("DOMContentLoaded", function() {
  const statusInput = document.getElementById("status");
  const statusValue = statusInput.value.toLowerCase();

  switch (statusValue) {
      case "menunggu":
          statusInput.classList.add("bg-warning");
          break;
      case "diproses":
          statusInput.classList.add("bg-success");
          break;
      case "selesai":
          statusInput.classList.add("bg-primary");
          break;
      case "gagal":
          statusInput.classList.add("bg-danger");
          break;
      default:
          break;
  }
});

function validateJudul(input) {
  const regex = /[^a-zA-Z\s]/g;
  if (regex.test(input.value)) {
      input.value = input.value.replace(regex, '');
      document.getElementById('error-message-judul').style.display = 'block';
  } else {
      document.getElementById('error-message-judul').style.display = 'none';
  }
  if (input.value.length > 150) {
      input.value = input.value.slice(0, 150);
      document.getElementById('error-message-judul').style.display = 'block';
  }
}
function validateUU(input) {
  if (input.value.length > 550) {
      input.value = input.value.slice(0, 550);
      document.getElementById('error-message-undangundang').style.display = 'block';
  } else {
      document.getElementById('error-message-undangundang').style.display = 'none';
  }
}
function validateReferensi(input) {
  if (input.value.length > 550) {
      input.value = input.value.slice(0, 550);
      document.getElementById('error-message-keterangan').style.display = 'block';
  } else {
      document.getElementById('error-message-keterangan').style.display = 'none';
  }
}

function generateRandomID() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var id = '';
    for (var i = 0; i < 13; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("id_uu").value = generateRandomID();
});

function setTodayDate() {
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    var today = new Date();
    var dayName = days[today.getDay()];
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = months[today.getMonth()];
    var yyyy = today.getFullYear();

    var formattedDate = dayName + ', ' + dd + ' ' + mm + ' ' + yyyy;
    document.getElementById("tanggal").value = formattedDate;
}

document.addEventListener("DOMContentLoaded", setTodayDate);
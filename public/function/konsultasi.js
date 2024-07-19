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
      document.getElementById('error-message-referensi').style.display = 'block';
  } else {
      document.getElementById('error-message-referensi').style.display = 'none';
  }
}
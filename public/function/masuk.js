document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("https://solusiadil-api.vercel.app/users")
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(key => {
            var user = data[key]; // Ambil pengguna dengan kunci ID saat ini

            if (user.email === email && user.password === password) {
                alert("Login berhasil");
                localStorage.setItem("userId", key);
                window.location.href = "beranda.html";
                return; 
            }
        });
        alert("Email atau password salah");
    })
    .catch(error => {
        console.error("Gagal mendapatkan data pengguna:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
    });
});

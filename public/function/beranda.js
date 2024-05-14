async function fetchUserData() {
    try {
        const nik = new URLSearchParams(window.location.search).get("nik");
        const apiUrl = `https://solusiadil-api.vercel.app/users/nik/${nik}`;
        const response = await fetch(apiUrl);
        const userData = await response.json();
        const uniqueId = Object.keys(userData)[0];
        const user = userData[uniqueId];

        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.innerHTML = `
            <strong>Nik:</strong> ${user.id_masyarakat}<br>
            <strong>Nama:</strong> ${user.nama}<br>
            <!-- Tambahkan informasi pengguna lainnya sesuai kebutuhan -->
        `;

    } catch (error) {
        console.error('Error fetching user data:', error);
        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.textContent = 'Failed to fetch user data.';
    }
}
document.addEventListener('DOMContentLoaded', fetchUserData);

{/* <form class="form" method="post" action="mail/mail.php">
									<div class="row">
										<div class="col-lg-6 col-md-6 col-12">
											<div class="form-group">
												<i class="fa fa-user"></i>
												<input type="text" name="first-name" placeholder="Nama Lengkap"
													required="required">
											</div>
										</div>
										<div class="col-lg-6 col-md-6 col-12">
											<div class="form-group">
												<i class="fa fa-envelope"></i>
												<input type="email" name="email" placeholder="Your Email"
													required="required">
											</div>
										</div>
										<div class="col-12">
											<div class="form-group">
												<i class="fa-solid fa-scale-balanced"></i>
												<input type="text" name="last-name" placeholder=" Pengajuan Pertanyaan"
													required="required">
											</div>
										</div>
										<div class="col-12">
											<div class="form-group message">
												<i class="fa fa-pencil"></i>
												<textarea name="message" rows="7"
													placeholder="keterangan Lengkap"></textarea>
											</div>
										</div>
										<div class="col-12">
											<div class="form-group button">
												<button type="submit" class="btn primary"><i
														class="fa fa-send"></i>Ajukan Konsultasi</button>
											</div>
										</div>
									</div>
								</form> */}
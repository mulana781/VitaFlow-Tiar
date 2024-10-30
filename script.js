$(document).ready(function() {
    $("#daftarForm").submit(function(event) {
        event.preventDefault();

        var nama = $("#nama").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var paket = $("#paket").val();
        var syaratKetentuan = $("#syaratKetentuan").is(":checked");

        if (nama === "" || email === "" || password === "" || paket === "" || !syaratKetentuan) {
            alert("Harap isi semua field dan setujui Syarat dan Ketentuan.");
            return false;
        }

        alert("Formulir berhasil dikirim!");
        $("#daftarForm")[0].reset();
        $("#daftarModal").modal('hide'); 
    });

    $("#subscribeForm").submit(function(event) {
        event.preventDefault();

        var nama = $("#nama").val();
        var email = $("#email").val();
        var nomorTelepon = $("#nomorTelepon").val();
        var metodePembayaran = $("#metodePembayaran").val();
        var paket = $("#selectedPaket").val();

        if (nama === "" || email === "" || nomorTelepon === "" || metodePembayaran === "") {
            alert("Harap isi semua field.");
            return false;
        }

        $.ajax({
            url: '/submit-subscription', 
            type: 'POST',
            data: {
                nama: nama,
                email: email,
                nomorTelepon: nomorTelepon,
                metodePembayaran: metodePembayaran,
                paket: paket
            },
            success: function(response) {
                alert("Berlangganan berhasil!");
                $("#subscribeForm")[0].reset();
                $("#subscribeModal").modal('hide');
            },
            error: function(error) {
                alert("Terjadi kesalahan. Silakan coba lagi.");
            }
        });
    });

    $('.pricing .btn').click(function() {
        var paket = $(this).data('paket');
        $('#selectedPaket').val(paket);
    });

    window.addEventListener('scroll', function() {
        var navbar = document.querySelector('#mainNav');
        var sticky = navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    $("#search-form").submit(function(event) {
        event.preventDefault();
        var searchQuery = $("#search-query").val().toLowerCase();

        var doctors = [
            { name: "Dr. Amelia Putri", specialization: "Kardiologi", location: "Jakarta" },
            { name: "Dr. Budiman Supriadi", specialization: "Psikiatri", location: "Bandung" },
            { name: "Dr. Citra Dewi", specialization: "Ortopedi", location: "Surabaya" },
            { name: "Dr. Dimas Pratama", specialization: "Gastroenterologi", location: "Denpasar" },
        ];

        let resultsHTML = "";
        doctors.forEach(function(doctor) {
            if (searchQuery === "" || 
                doctor.name.toLowerCase().includes(searchQuery) || 
                doctor.specialization.toLowerCase().includes(searchQuery)) {

                resultsHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${doctor.name}</h5>
                            <p class="card-text">Spesialisasi: ${doctor.specialization}</p>
                            <p class="card-text">Lokasi: ${doctor.location}</p>
                            <a href="#" class="btn btn-primary">Lihat Profil</a>
                        </div>
                    </div>
                `;
            }
        });

        $("#search-results").html(resultsHTML);
    });
        });
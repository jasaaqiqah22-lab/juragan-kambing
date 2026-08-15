// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked (only on mobile)
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Hanya tutup menu jika ukuran layar mobile
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = this.elements[0].value;
        const email = this.elements[1].value;
        const whatsapp = this.elements[2].value;
        const pesan = this.elements[3].value;
        
        // Format pesan untuk WhatsApp
        const pesanWhatsApp = encodeURIComponent(
            `Nama: ${nama}\nEmail: ${email}\nNo. WhatsApp: ${whatsapp}\n\nPesan: ${pesan}`
        );
        
        // Redirect ke WhatsApp
        window.open(`https://wa.me/6285211885000?text=${pesanWhatsApp}`, '_blank');
        
        // Reset form
        this.reset();
    });
}

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Responsive Navigation - Ensure menu shows on desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Initialize on page load
window.addEventListener('load', function() {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
});

// ==================== KALKULATOR AQIQAH ====================

// Fungsi Format Rupiah
function formatRupiah(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Elemen Kalkulator
const jumlahEkorInput = document.getElementById('jumlahEkor');
const pilihanPaketSelect = document.getElementById('pilihanPaket');
const biayaTambahanInput = document.getElementById('biayaTambahan');
const diskonInput = document.getElementById('diskon');

// Elemen Hasil
const totalHewanDisplay = document.getElementById('totalHewan');
const hargaPerEkorDisplay = document.getElementById('hargaPerEkor');
const subtotalDisplay = document.getElementById('subtotal');
const biayaTambahanDisplay = document.getElementById('biayaTambahanHasil');
const diskonDisplay = document.getElementById('diskonHasil');
const totalEstimasiDisplay = document.getElementById('totalEstimasi');
const btnKonfirmasi = document.getElementById('btnKonfirmasi');

// Fungsi Hitung Kalkulator
function hitungEstimasi() {
    const jumlahEkor = parseInt(jumlahEkorInput.value) || 1;
    const hargaPerEkor = parseInt(pilihanPaketSelect.value) || 1900000;
    const biayaTambahan = parseInt(biayaTambahanInput.value) || 0;
    const diskon = parseInt(diskonInput.value) || 0;

    // Hitung
    const subtotal = jumlahEkor * hargaPerEkor;
    const totalSebelumDiskon = subtotal + biayaTambahan;
    const totalAkhir = totalSebelumDiskon - diskon;

    // Update Display
    totalHewanDisplay.textContent = `${jumlahEkor} ekor`;
    hargaPerEkorDisplay.textContent = formatRupiah(hargaPerEkor);
    subtotalDisplay.textContent = formatRupiah(subtotal);
    biayaTambahanDisplay.textContent = formatRupiah(biayaTambahan);
    diskonDisplay.textContent = `-${formatRupiah(diskon)}`;
    totalEstimasiDisplay.textContent = formatRupiah(totalAkhir);

    // Update tombol konfirmasi dengan data
    btnKonfirmasi.setAttribute('data-total', totalAkhir);
}

// Event Listeners untuk Kalkulator
if (jumlahEkorInput) {
    jumlahEkorInput.addEventListener('input', hitungEstimasi);
}

if (pilihanPaketSelect) {
    pilihanPaketSelect.addEventListener('change', hitungEstimasi);
}

if (biayaTambahanInput) {
    biayaTambahanInput.addEventListener('input', hitungEstimasi);
}

if (diskonInput) {
    diskonInput.addEventListener('input', hitungEstimasi);
}

// Button Pesan di Card Harga
const btnPesanCards = document.querySelectorAll('.btn-pesan');
btnPesanCards.forEach(btn => {
    btn.addEventListener('click', function() {
        const paket = this.getAttribute('data-paket');
        const harga = parseInt(this.getAttribute('data-harga'));
        
        // Scroll ke kalkulator
        const kalkulator = document.querySelector('.kalkulator-section');
        kalkulator.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Set nilai di kalkulator
        pilihanPaketSelect.value = harga;
        jumlahEkorInput.value = 1;
        biayaTambahanInput.value = 0;
        diskonInput.value = 0;
        
        // Hitung estimasi
        hitungEstimasi();
    });
});

// Button Konfirmasi di Kalkulator
if (btnKonfirmasi) {
    btnKonfirmasi.addEventListener('click', function() {
        const jumlahEkor = document.getElementById('jumlahEkor').value;
        const paket = document.getElementById('pilihanPaket').options[document.getElementById('pilihanPaket').selectedIndex].text;
        const total = this.getAttribute('data-total');
        
        // Format pesan untuk WhatsApp
        const pesanWhatsApp = encodeURIComponent(
            `Halo, saya ingin mengajukan pemesanan aqiqah:\n\n` +
            `📦 Paket: ${paket}\n` +
            `🐐 Jumlah: ${jumlahEkor} ekor\n` +
            `💰 Estimasi Biaya: Rp ${parseInt(total).toLocaleString('id-ID')}\n\n` +
            `Mohon konfirmasi ketersediaan dan detail lebih lanjut. Terima kasih!`
        );
        
        // Buka WhatsApp
        window.open(`https://wa.me/6285211885000?text=${pesanWhatsApp}`, '_blank');
    });
}

// Initialize Kalkulator pada page load
window.addEventListener('load', function() {
    hitungEstimasi();
});

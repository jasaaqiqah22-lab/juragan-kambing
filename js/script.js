// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.style.display = 'none';
        if (hamburger) hamburger.classList.remove('active');
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

// Responsive Navigation
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        if (hamburger) hamburger.classList.remove('active');
    } else {
        navMenu.style.display = 'none';
    }
});
// Détails contextuels (si présents dans certaines pages)
document.querySelectorAll('.bouton').forEach(button => {
    button.addEventListener('click', function() {
        var targetDetails = document.getElementById(this.getAttribute('data-details'));
        targetDetails.classList.toggle('visible');
    });
});


document.querySelectorAll('.popup-details .close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        var targetDetails = this.parentElement;
        targetDetails.classList.remove('visible');
    });
});

// Effet de défilement fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        }); 
    });
});

// Animation d'apparition au défilement (reveal)
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .contenu').forEach(section => {
    revealObserver.observe(section);
});

// Mode sombre / clair (classe appliquée sur <html>)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Vérifier le mode actuel dans le stockage local
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    root.classList.add('blue-mode');
}

// Fonction pour mettre à jour l'icône
function updateThemeIcon() {
    if (!themeToggle) return;
    const isDarkMode = root.classList.contains('blue-mode');
    themeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}
updateThemeIcon();

// Basculer entre les modes
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('blue-mode');
        const isDarkMode = root.classList.contains('blue-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon();
    });
}

// Nettoyage éventuel : retirer ancienne classe sur body si présente
if (document.body.classList.contains('blue-mode')) {
    document.body.classList.remove('blue-mode');
}

// Compteur dynamique
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    counter.textContent = '0';
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.textContent;
        const increment = target / 200;

        if (current < target) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(updateCounter, 10);
        } else {
            counter.textContent = target;
        }
    };
    updateCounter();
});

document.addEventListener('DOMContentLoaded', function() {
    // Crée le bouton avec un chevron SVG
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.display = 'none'; // Caché au départ
    scrollToTopBtn.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;">
            <path d="M7 14l5-5 5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    document.body.appendChild(scrollToTopBtn);

    // Affiche ou cache le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll fluide vers le haut
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    

});
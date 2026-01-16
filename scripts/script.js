// Navigation
const navLinks = document.querySelectorAll('.navbar-nav a');

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.navbar-nav');
    navMenu.classList.toggle('active');
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu
            const navMenu = document.querySelector('.navbar-nav');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initial call on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Retour au haut');
    scrollToTopBtn.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14l5-5 5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Modal management
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close when clicking outside content
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal(id);
            }
        }
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize modal triggers with data-modal attribute
document.addEventListener('DOMContentLoaded', function() {
    // Handle modal triggers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Handle navigation with data-href
    document.querySelectorAll('[data-href]').forEach(element => {
        element.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
        // Add cursor pointer style
        element.style.cursor = 'pointer';
    });

    // Close modals with X button
    document.querySelectorAll('.popup-details .close').forEach(btn => {
        btn.onclick = function() {
            const modal = this.closest('.popup-details');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Close with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.popup-details').forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
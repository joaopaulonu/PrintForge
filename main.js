// main.js - Código completo com a correção das animações

// Theme Toggle
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Smooth Scroll (Mantido)
class SmoothScroll {
    constructor() {
        this.bindNavLinks();
    }

    bindNavLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Menu (Mantido)
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close menu on link click
            navLinks.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    }
}


// Animation on Scroll (Intersection Observer) - **CORRIGIDO**
document.addEventListener('DOMContentLoaded', function() {
    new ThemeManager();
    new SmoothScroll();
    new MobileMenu();

    // 1. Aplica estilos iniciais e adiciona uma classe de controle para todos os elementos que devem ser animados.
    document.querySelectorAll('.advantage-card, .language-card, .project-card, .blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; 
        card.classList.add('animate-on-scroll-target'); 
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Animar quando 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica a animação (estado final)
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 2. Parar de observar depois que o elemento animou (CORREÇÃO)
                // Isso impede a repetição do "bug" da animação.
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observa todos os elementos com a nova classe
    document.querySelectorAll('.animate-on-scroll-target').forEach(card => {
        observer.observe(card);
    });
});

// Utility functions (Mantidas)
const Utils = {
    // Format currency
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    // Validate email
    validateEmail: (email) => {
        const re = /^[^s@]+@[^s@]+.[^s@]+$/;
        return re.test(email);
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Simple way to get URL parameters
    getUrlParams: () => {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            if (key) params[key] = value;
        });
        return params;
    }
};


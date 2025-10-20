// js/navbar.js

// --- Menu de Navegação ---
const navbarHTML = `
    <nav class="navbar">
        <a href="index.html" class="logo">PrintForge</a>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="sobre.html">Sobre</a></li>
            <li><a href="contato.html">Contato</a></li>
            <li><a href="login.html" class="cta-button">Login</a></li>
            <li><a href="dashboard.html" class="cta-button">Dashboard</a></li>
        </ul>
        <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>
`;

// --- Rodapé (Footer) ---
const footerHTML = `
    <div class="footer-content">
        <p>&copy; ${new Date().getFullYear()} PrintForge. Todos os direitos reservados.</p>
        <div class="footer-links">
            <a href="sobre.html">Sobre</a>
            <a href="contato.html">Contato</a>
            <a href="#">Privacidade</a>
        </div>
    </div>
`;

// Função para injetar o HTML na página
document.addEventListener('DOMContentLoaded', () => {
    // 1. Injeta o Menu de Navegação
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;

        // Adiciona a funcionalidade de toggle para mobile
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // 2. Injeta o Rodapé
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
});

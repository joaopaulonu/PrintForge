// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // Lógica para a Página de Contato (contato.html)
    // ------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(event) {
            // Previne o envio padrão do formulário (que recarregaria a página)
            event.preventDefault();

            // Simulação de validação e envio
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || mensagem === '') {
                // Se algum campo estiver vazio
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                formMessage.className = 'error-message';
                formMessage.classList.remove('hidden');
            } else if (!validateEmail(email)) {
                // Validação de formato de e-mail simples
                formMessage.textContent = 'Por favor, insira um e-mail válido.';
                formMessage.className = 'error-message';
                formMessage.classList.remove('hidden');
            } else {
                // Sucesso na simulação de envio
                formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                formMessage.className = 'success-message';
                formMessage.classList.remove('hidden');
                
                // Limpa o formulário
                contactForm.reset();
            }

            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }

    // Função de validação de e-mail simples (não é a mais robusta, mas funciona)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // ------------------------------------------
    // Lógica para a Página de Login (login.html)
    // ------------------------------------------
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Apenas uma simulação visual de login
            alert('Login simulado! Redirecionando para o Dashboard...');
            window.location.href = 'dashboard.html';
        });
    }

});

// Adicione aqui qualquer outra lógica JavaScript que for necessária para outras páginas

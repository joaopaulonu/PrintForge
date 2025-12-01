// Gerenciador da página de Contato
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindFormEvents();
    }

    // Associa evento de submissão do formulário
    bindFormEvents() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    // Lida com a submissão, coleta e valida os dados
    async handleFormSubmit(e) {
        e.preventDefault();
        this.removeNotification(); // Limpa notificações anteriores

        const formData = {
            name: document.getElementById('contact-name').value.trim(),
            email: document.getElementById('contact-email').value.trim(),
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value.trim()
        };

        if (this.validateForm(formData)) {
            await this.submitForm(formData);
        }
    }

    // Validação dos campos do formulário
    validateForm(data) {
        if (!data.name || data.name.length < 2) {
            this.showError('Por favor, insira seu nome completo.');
            return false;
        }

        if (!Utils.validateEmail(data.email)) {
            this.showError('Por favor, insira um email válido.');
            return false;
        }

        if (!data.subject) {
            this.showError('Por favor, selecione um assunto.');
            return false;
        }

        if (!data.message || data.message.length < 10) {
            this.showError('A mensagem deve ter pelo menos 10 caracteres.');
            return false;
        }

        return true;
    }

    // Simulação de envio do formulário (chamada de API)
    async submitForm(formData) {
        this.showLoading('Enviando mensagem...');

        // Simula chamada de API
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.hideLoading();
        
        // Exibe mensagem de sucesso visual
        this.showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpa o formulário
        document.getElementById('contact-form').reset();
    }

    // Exibe mensagem de erro visual (usa .error-message do main.css)
    showError(message) {
        this.removeNotification(); 
        const form = document.getElementById('contact-form');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message'; 
        errorDiv.textContent = message;

        form.insertBefore(errorDiv, form.firstChild); 

        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Exibe mensagem de sucesso visual (usa .success-message do main.css)
    showSuccess(message) {
        this.removeNotification();
        const form = document.getElementById('contact-form');
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message'; 
        successDiv.textContent = message;

        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Remove todas as mensagens de feedback
    removeNotification() {
        document.querySelectorAll('.error-message, .success-message').forEach(msg => msg.remove());
    }

    // Funções placeholder para feedback visual (pode reutilizar lógica do auth.js se necessário)
    showLoading(message) {
        console.log('Loading:', message);
    }

    hideLoading() {
        console.log('Loading hidden');
    }
}

// Inicializa o gerenciador ao carregar o DOM
document.addEventListener('DOMContentLoaded', function() {
    // Nota: ThemeManager é inicializado via main.js
    new ContactManager();
});

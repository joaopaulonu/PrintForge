// auth.js - Código completo com correções e novas funcionalidades

// Objeto Utils necessário para as validações e obtenção de parâmetros de URL
const Utils = {
    validateEmail: (email) => {
        const re = /^[^s@]+@[^s@]+.[^s@]+$/;
        return re.test(email);
    },
    getUrlParams: () => {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            if (key) params[key] = value;
        });
        return params;
    }
};

class AuthManager {
    constructor() {
        this.currentTab = 'freelancer';
        this.init();
    }

    init() {
        this.bindTabEvents();
        this.bindFormEvents(); 
        this.bindSocialLoginEvents(); 
        this.checkUrlParams();
    }

    checkUrlParams() {
        const params = Utils.getUrlParams();
        if (params.type) {
            this.switchTab(params.type);
        }
    }

    bindTabEvents() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                // Garante que o clique na aba 'empresa' troque a aba
                this.switchTab(tab); 
            });
        });
    }

    switchTab(tab) {
        // Atualiza botões
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Atualiza conteúdo
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');

        this.currentTab = tab;
    }

    bindFormEvents() {
        const freelancerForm = document.getElementById('freelancer-form');
        const empresaForm = document.getElementById('empresa-form');

        if (freelancerForm) {
            freelancerForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'freelancer'));
        }
        if (empresaForm) {
            // Garante que a submissão do formulário da Empresa funcione
            empresaForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'empresa'));
        }
    }

    // Lógica de tratamento de Login Social (GitHub, Outlook)
    bindSocialLoginEvents() {
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e.currentTarget));
        });
    }

    handleSocialLogin(btn) {
        const authType = btn.dataset.auth;
        
        this.removeErrorMessages();
        this.showLoading(`Acessando com ${authType.charAt(0).toUpperCase() + authType.slice(1)}...`);
        
        let redirectUrl = '';

        if (this.currentTab === 'freelancer' && authType === 'github') {
            redirectUrl = 'workspace-freelancer.html'; 
        } else if (this.currentTab === 'empresa' && authType === 'outlook') {
            redirectUrl = 'workspace-empresa.html';
        } else {
            this.showError(`Opção de login com ${authType} não permitida para a aba ${this.currentTab}.`);
            this.hideLoading();
            return;
        }

        setTimeout(() => {
            window.location.href = redirectUrl; 
        }, 1500);
    }
    
    // Lógica unificada para submissão dos formulários e redirecionamento
    async handleFormSubmit(e, type) {
        e.preventDefault();
        this.removeErrorMessages();
        this.showLoading('Verificando credenciais...');

        let validationPassed = false;
        let redirectUrl = '';
        
        // Simulação de chamada à API/backend
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (type === 'freelancer') {
            const email = document.getElementById('freelancer-email').value;
            const password = document.getElementById('freelancer-password').value;

            if (Utils.validateEmail(email) && password.length >= 6) {
                validationPassed = true;
                redirectUrl = 'workspace-freelancer.html'; 
            } else {
                this.showError('Login Freelancer falhou. Verifique o email e a senha (mínimo 6 caracteres).');
            }

        } else if (type === 'empresa') {
            const email = document.getElementById('empresa-email').value;
            const password = document.getElementById('empresa-password').value;
            const cnpj = document.getElementById('empresa-cnpj').value;
            
            if (Utils.validateEmail(email) && password.length >= 6 && cnpj.length >= 14) {
                validationPassed = true;
                redirectUrl = 'workspace-empresa.html'; 
            } else {
                this.showError('Login Empresa falhou. Verifique Email, Senha e CNPJ (mínimo 14 caracteres).');
            }
        }
        
        this.hideLoading();

        if (validationPassed) {
            window.location.href = redirectUrl; 
        }
    }

    // Funções de feedback (showError, showLoading, etc.)
    showError(message) {
        this.removeErrorMessages(); 

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const currentForm = document.querySelector('.auth-form.active');
        if (currentForm) {
            // Insere a mensagem de erro acima do formulário
            currentForm.insertBefore(errorDiv, currentForm.firstChild);
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        } else {
            console.error(message);
        }
    }

    removeErrorMessages() {
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    }

    showLoading(message) {
        this.removeLoading();

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>${message}</p>
            </div>
        `;
        // Estilos de posição fixos garantidos via JS, mas o visual é pelo CSS
        loadingDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
        `;

        document.body.appendChild(loadingDiv);
    }

    hideLoading() {
        this.removeLoading();
    }

    removeLoading() {
        const existing = document.querySelector('.loading-overlay');
        if (existing) {
            existing.remove();
        }
    }
}

// Inicializa o gerenciador de autenticação
document.addEventListener('DOMContentLoaded', function() {
    new AuthManager();
});

class FreelancerWorkspace {
    constructor() {
        this.currentSection = 'projetos';
        this.projects = [];
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    init() {
        this.bindNavigation();
        this.loadProjects();
        this.initTodoList();
        this.initCodeEditor();
        this.loadFinanceData();
    }

    bindNavigation() {
        // Sidebar navigation
        document.querySelectorAll('.menu-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                
                // NOVIDADE: Checa se o link é o botão de Sair (que tem a classe 'logout-link').
                // Se NÃO for o botão de Sair, fazemos o roteamento interno.
                if (!link.classList.contains('logout-link')) {
                    e.preventDefault();
                    const target = link.getAttribute('href').substring(1);
                    this.showSection(target);
                }
                // Se for o botão de Sair, o 'e.preventDefault()' não é chamado,
                // e o navegador executa a navegação padrão para 'index.html'.

            });
        });

        // Mobile menu toggle (if needed)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
        }
    }

    showSection(sectionId) {
        // Update menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[href="#${sectionId}"]`).parentElement.classList.add('active');

        // Update sections
        document.querySelectorAll('.workspace-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;

        // Seção Agenda tem a To-Do List, é bom carregá-la novamente
        if (sectionId === 'agenda') {
            this.renderTodoList();
        }
    }

    // ... (O restante do código da classe FreelancerWorkspace continua)

    loadProjects() {
        // Simulação de carregamento de projetos
        this.projects = [
            // ... (seus dados de projeto)
        ];
        // this.renderProjects(); // Você pode descomentar se tiver a função de renderização
    }

    initTodoList() {
        this.renderTodoList();
        this.bindTodoEvents();
    }

    renderTodoList() {
        const todoList = document.querySelector('.todo-items');
        if (!todoList) return;
        todoList.innerHTML = '';

        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
                <span>${todo.text}</span>
                <i class="fas fa-trash" data-index="${index}"></i>
            `;
            todoList.appendChild(li);
        });
    }

    bindTodoEvents() {
        const addBtn = document.getElementById('add-todo');
        const todoInput = document.getElementById('new-todo');
        const todoList = document.querySelector('.todo-items');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.addTodo(todoInput.value));
        }

        if (todoList) {
            todoList.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (e.target.type === 'checkbox') {
                    this.toggleTodo(index);
                } else if (e.target.classList.contains('fa-trash')) {
                    this.deleteTodo(index);
                }
            });
        }
    }

    addTodo(text) {
        if (text.trim() === '') return;
        this.todos.push({ text: text.trim(), completed: false });
        this.saveTodos();
        this.renderTodoList();
        document.getElementById('new-todo').value = '';
    }

    toggleTodo(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodos();
        this.renderTodoList();
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodos();
        this.renderTodoList();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    initCodeEditor() {
        // Implementação simulada do editor de código
        console.log("Editor de código inicializado.");
        // Se você tiver a biblioteca CodeMirror ou Ace Editor, a inicialização seria aqui.
    }

    loadFinanceData() {
        // Implementação simulada para gráficos/dados financeiros
        console.log("Dados financeiros carregados.");
    }
}

let workspace; // Variável global para acesso de depuração
document.addEventListener('DOMContentLoaded', function() {
    workspace = new FreelancerWorkspace();
});

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .modal {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content.center;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
`;
document.head.appendChild(style);

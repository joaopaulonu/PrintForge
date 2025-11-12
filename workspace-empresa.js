class EmpresaWorkspace {
    constructor() {
        this.currentSection = 'lançar-projeto';
        this.projects = JSON.parse(localStorage.getItem('empresaProjects')) || [];
        this.init();
    }

    init() {
        this.bindNavigation();
        this.bindProjectForm();
        this.loadProjects();
    }

    bindNavigation() {
        document.querySelectorAll('.menu-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                
                // CORREÇÃO: Checa se o link NÃO é o botão de Sair.
                // Apenas links internos terão o comportamento padrão prevenido.
                if (!link.classList.contains('logout-link')) {
                    e.preventDefault();
                    const target = link.getAttribute('href').substring(1);
                    this.showSection(target);
                }
            });
        });
    }

    showSection(sectionId) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[href="#${sectionId}"]`).parentElement.classList.add('active');

        document.querySelectorAll('.workspace-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;

        if (sectionId === 'meus-projetos') {
            this.renderMyProjects();
        }
    }

    bindProjectForm() {
        const form = document.querySelector('.project-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleProjectSubmit(e));
        }
    }

    handleProjectSubmit(e) {
        e.preventDefault();

        const newProject = {
            id: Date.now(),
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value,
            budget: document.getElementById('project-budget').value,
            deadline: document.getElementById('project-deadline').value,
            skills: document.getElementById('project-skills').value,
            category: document.getElementById('project-category').value,
            negotiable: document.getElementById('budget-negotiable').checked,
            status: 'ativo' // Novo projeto é ativo por padrão
        };

        this.projects.push(newProject);
        this.saveProjects();
        this.showSection('meus-projetos'); // Mostra a lista após lançar
        document.querySelector('.project-form').reset();
        alert('Projeto publicado com sucesso!');
    }

    loadProjects() {
        // Renderiza os projetos ao carregar a página se a seção correta estiver ativa
        if (this.currentSection === 'meus-projetos') {
            this.renderMyProjects();
        }
    }

    saveProjects() {
        localStorage.setItem('empresaProjects', JSON.stringify(this.projects));
    }

    renderMyProjects() {
        const listContainer = document.querySelector('.projects-list');
        if (!listContainer) return;

        listContainer.innerHTML = ''; // Limpa a lista

        if (this.projects.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>Você ainda não tem projetos ativos.</p>
                    <button class="btn btn-primary" onclick="workspace.showSection('lançar-projeto')">Lançar Meu Primeiro Projeto</button>
                </div>
            `;
            return;
        }

        this.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.dataset.id = project.id;
            
            projectItem.innerHTML = `
                <div class="project-item-header">
                    <h3>${project.title}</h3>
                    <span class="project-status active">${project.status.toUpperCase()}</span>
                </div>
                <p class="project-item-description">${project.description.substring(0, 100)}...</p>
                <div class="project-item-details">
                    <span><i class="fas fa-money-bill-wave"></i> Orçamento: R$ ${parseFloat(project.budget).toLocaleString('pt-BR')}</span>
                    <span><i class="fas fa-clock"></i> Prazo: ${project.deadline} dias</span>
                    <span><i class="fas fa-tag"></i> Categoria: ${project.category}</span>
                </div>
                <div class="project-item-actions">
                    <button class="btn btn-primary">
                        <i class="fas fa-eye"></i> Ver Propostas
                    </button>
                    <button class="btn btn-danger" data-action="delete">
                        <i class="fas fa-times"></i> Finalizar
                    </button>
                </div>
            `;
            listContainer.appendChild(projectItem);
        });

        this.bindProjectActions(listContainer);
    }

    bindProjectActions(container) {
        container.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.closest('.project-item').dataset.id;
                this.deleteProject(parseInt(projectId));
            });
        });
    }

    deleteProject(id) {
        if (confirm('Tem certeza que deseja finalizar este projeto?')) {
            this.projects = this.projects.filter(p => p.id !== id);
            this.saveProjects();
            this.renderMyProjects();
        }
    }
}

let workspace;
document.addEventListener('DOMContentLoaded', function() {
    workspace = new EmpresaWorkspace();
});

// Implementação de estilos para os projetos listados (apenas para exibição)
const style = document.createElement('style');
style.textContent = `
    .project-item {
        background: var(--bg-primary);
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        border-left: 5px solid var(--primary-blue);
    }

    .project-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .project-status {
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .project-status.active {
        background: var(--success);
        color: white;
    }

    .project-status.pending {
        background: var(--warning);
        color: black;
    }

    .project-item-description {
        color: var(--text-secondary);
        margin-bottom: 1rem;
    }

    .project-item-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .project-item-actions {
        display: flex;
        gap: 0.5rem;
    }

    .btn-danger {
        background: var(--danger);
        color: white;
    }

    .btn-danger:hover {
        background: #c82333;
    }

    .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    }

    .empty-state i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style);
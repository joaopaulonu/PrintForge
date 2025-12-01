class BlogManager {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindFilterEvents();
        this.initSearch();
    }

    bindFilterEvents() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.textContent.toLowerCase();
                this.filterPosts(filter);
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterPosts(filter) {
        const posts = document.querySelectorAll('.blog-card');
        const filterValue = filter === 'todos' ? 'all' : filter;

        posts.forEach(post => {
            if (filterValue === 'all' || post.dataset.category === filterValue) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });

        this.currentFilter = filterValue;
    }

    initSearch() {
        // Add search functionality if needed
        console.log('Blog search initialized');
    }
}

// Initialize blog manager
document.addEventListener('DOMContentLoaded', function() {
    new BlogManager();
});

class ProfileModal {
    constructor() {
        this.createModalHTML();
        this.profileModal = document.getElementById('profileModal');
        this.profileCloseBtn = document.querySelector('.profile-close');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        this.initEventListeners();
    }

    createModalHTML() {
        const modalHTML = `
            <div id="profileModal" class="modal">
                <div class="modal-content profile-modal-content">
                    <span class="close profile-close">&times;</span>
                    <div class="profile-form">
                        <h2>Профіль користувача</h2>
                        
                        <div class="profile-tabs">
                            <button class="profile-tab active" data-tab="info">Інформація</button>
                            <button class="profile-tab" data-tab="favorites">Обране</button>
                        </div>

                        <div class="profile-content">
                            <div id="profile-info" class="profile-tab-content active">
                                <div class="profile-info">
                                    <div class="profile-field">
                                        <label>Логін:</label>
                                        <span id="profileLogin"></span>
                                    </div>
                                    <div class="profile-field">
                                        <label>Email:</label>
                                        <span id="profileEmail"></span>
                                    </div>
                                </div>
                            </div>

                            <div id="profile-favorites" class="profile-tab-content">
                                <div class="favorites-container">
                                    <div class="favorites-header">
                                        <h3>Обрані товари</h3>
                                        <span class="favorites-count">0 товарів</span>
                                    </div>
                                    <div class="favorites-grid" id="favoritesGrid">
                                        <div class="favorites-empty">
                                            <div class="empty-icon">♡</div>
                                            <p>У вас поки немає обраних товарів</p>
                                            <span>Додайте товари в обране, щоб вони з'явилися тут</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button id="logoutBtn" class="registration-btn logout-btn">Вийти з акаунта</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    initEventListeners() {
        this.profileCloseBtn?.addEventListener('click', () => this.closeProfileModal());
        this.logoutBtn?.addEventListener('click', () => this.handleLogout());
        
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.profileModal) this.closeProfileModal();
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.profile-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.profile-tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`profile-${tabName}`).classList.add('active');
    }

    openProfileModal(user) {
        document.getElementById('profileLogin').textContent = user.login;
        document.getElementById('profileEmail').textContent = user.email;
        
        this.loadFavorites(user.id);
        
        this.profileModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    loadFavorites(userId) {
        const favorites = this.getFavorites(userId);
        const favoritesGrid = document.getElementById('favoritesGrid');
        const favoritesCount = document.querySelector('.favorites-count');
        
        if (favorites.length === 0) {
            favoritesGrid.innerHTML = `
                <div class="favorites-empty">
                    <div class="empty-icon">🧺</div>
                    <p>У вас поки немає обраних товарів</p>
                    <span>Додайте товари в обране, щоб вони з'явилися тут</span>
                </div>
            `;
            favoritesCount.textContent = '0 товарів';
        } else {
            favoritesCount.textContent = `${favorites.length} товарів`;
        }
    }

    getFavorites(userId) {
        return JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
    }

    closeProfileModal() {
        this.profileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        this.updateGreeting('Доброго дня');
        this.closeProfileModal();
    }

    updateGreeting(username) {
        const greeting = document.getElementById('greeting');
        if (username === 'Доброго дня') {
            greeting.textContent = `${username}:`;
        } else {
            greeting.textContent = `Привіт, ${username}!`;
        }
    }
}

window.ProfileModal = ProfileModal;

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
                        <h2>User Profile</h2>
                        <div class="profile-tabs">
                            <button class="profile-tab active" data-tab="info">Information</button>
                        </div>
                        <div class="profile-content">
                            <div id="profile-info" class="profile-tab-content active">
                                <div class="profile-info">
                                    <div class="profile-field">
                                        <label>Login:</label>
                                        <span id="profileLogin"></span>
                                    </div>
                                    <div class="profile-field">
                                        <label>Email:</label>
                                        <span id="profileEmail"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="logoutBtn" class="registration-btn logout-btn">Log out</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // ініціалізація + обробників подій
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

    // перемикання вкладок профілю
    switchTab(tabName) {
        document.querySelectorAll('.profile-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.profile-tab-content').forEach(content => content.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`profile-${tabName}`).classList.add('active');
    }

    // відкриття модального вікна профілю
    openProfileModal(user) {
        document.getElementById('profileLogin').textContent = user.login;
        document.getElementById('profileEmail').textContent = user.email;
        this.profileModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // закриття модального вікна профілю
    closeProfileModal() {
        this.profileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // обробка виходу з акаунта
    handleLogout() {
        localStorage.removeItem('currentUser');
        this.updateGreeting('Good afternoon');
        this.closeProfileModal();
    }

    // оновлення привітання користувача
    updateGreeting(username) {
        const greeting = document.getElementById('greeting');
        if (username === 'Good afternoon') {
            greeting.textContent = `${username}:`;
        } else {
            greeting.textContent = `Hello, ${username}!`;
        }
    }
}

window.ProfileModal = ProfileModal;

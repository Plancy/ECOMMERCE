class RegistrationModal {
    constructor() {
        this.profileModal = new ProfileModal();
        this.createModalHTML();
        this.initElements();
        this.initEventListeners();
        this.loadUsers();
    }

    createModalHTML() {
        const modalHTML = `
            <div id="registrationModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="loginForm" class="registration-form">
                        <h2>Account login</h2>
                        <form id="loginFormElement">
                            <div class="form-group">
                                <label for="loginEmail">Email:</label>
                                <input type="email" id="loginEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword">Password:</label>
                                <input type="password" id="loginPassword" required>
                            </div>
                            <button type="submit" class="registration-btn">Log in</button>
                        </form>
                        <p class="switch-form">Don't have an account? <span id="showRegister">Register</span></p>
                    </div>
                    <div id="registerForm" class="registration-form" style="display: none;">
                        <h2>Registration</h2>
                        <form id="registerFormElement">
                            <div class="form-group">
                                <label for="registerLogin">Login:</label>
                                <input type="text" id="registerLogin" required>
                            </div>
                            <div class="form-group">
                                <label for="registerEmail">Email:</label>
                                <input type="email" id="registerEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="registerPassword">Password:</label>
                                <input type="password" id="registerPassword" required>
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Repeat password:</label>
                                <input type="password" id="confirmPassword" required>
                            </div>
                            <button type="submit" class="registration-btn">Register</button>
                        </form>
                        <p class="switch-form">Already have an account? <span id="showLogin">Log in</span></p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    initElements() {
        this.modal = document.getElementById('registrationModal');
        this.userIcon = document.getElementById('userIcon');
        this.closeBtn = document.querySelector('#registrationModal .close');
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.showRegisterBtn = document.getElementById('showRegister');
        this.showLoginBtn = document.getElementById('showLogin');
        this.loginFormElement = document.getElementById('loginFormElement');
        this.registerFormElement = document.getElementById('registerFormElement');
    }

    initEventListeners() {
        this.userIcon.addEventListener('click', () => this.handleUserIconClick());

        this.closeBtn.addEventListener('click', () => this.closeModal());

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        this.showRegisterBtn.addEventListener('click', () => this.showRegisterForm());
        this.showLoginBtn.addEventListener('click', () => this.showLoginForm());

        this.loginFormElement.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerFormElement.addEventListener('submit', (e) => this.handleRegister(e));
    }

    handleUserIconClick() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (currentUser) {
            this.profileModal.openProfileModal(currentUser);
        } else {
            this.openModal();
        }
    }

    openModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.clearForms();
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        this.profileModal.updateGreeting('Good afternoon!');
        this.closeModal();
    }

    clearForms() {
        this.loginFormElement.reset();
        this.registerFormElement.reset();
    }

    showRegisterForm() {
        this.loginForm.style.display = 'none';
        this.registerForm.style.display = 'block';
    }

    showLoginForm() {
        this.registerForm.style.display = 'none';
        this.loginForm.style.display = 'block';
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.loginSuccess(user);
        }
    }

    handleRegister(e) {
        e.preventDefault();

        const login = document.getElementById('registerLogin').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const users = this.getUsers();

        const newUser = {
            id: Date.now(),
            login,
            email,
            password,
            registeredAt: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);

        this.showLoginForm();
    }

    loginSuccess(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.profileModal.updateGreeting(user.login);
        this.closeModal();
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    loadUsers() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (currentUser) {
            this.profileModal.updateGreeting(currentUser.login);
        } else {
            this.profileModal.updateGreeting('Доброго дня');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RegistrationModal();
});

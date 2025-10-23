class ProfileModal {
    constructor() {
        this.createModalHTML();
        this.profileModal = document.getElementById('profileModal');
        this.profileCloseBtn = document.querySelector('.profile-close');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        this.initEventListeners();
    }

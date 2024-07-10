
class User {
    constructor(id, name, city, phone) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.phone = phone;
    }
}


class UserManager {
    constructor() {
        this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
        this.users = [];
        this.init();
    }

   
    async init() {
        await this.loadUsers();
        this.displayUsers();
        this.setupForm();
    }

   
    async loadUsers() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Error loading users');
            const data = await response.json();
            this.users = data.map(user => new User(user.id, user.name, user.address.city, user.phone));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

   
    displayUsers() {
        const tableBody = document.querySelector('#usersTable tbody');
        tableBody.innerHTML = ''; 
        this.users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.city}</td>
            `;
            tableBody.appendChild(row);
        });
    }

   
    async getUserById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok) throw new Error('User not found');
            const data = await response.json();
            console.log('User found:', data);
            return new User(data.id, data.name, data.address.city, data.phone);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

   
    async showUserInfo(id) {
        const user = await this.getUserById(id);
        const userInfoDiv = document.getElementById('userInfo');
        if (user) {
            userInfoDiv.innerHTML = `
                <h2>User info</h2>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
            `;
        } else {
            userInfoDiv.innerHTML = '<p>User not found</p>';
        }
    }

    
    setupForm() {
        document.getElementById('userForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const userId = document.getElementById('userId').value;
            if (userId) {
                this.showUserInfo(userId);
            } else {
                alert('insert ID.');
            }
        });
    }
}


new UserManager();

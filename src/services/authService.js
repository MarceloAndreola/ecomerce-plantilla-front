class AuthService {
    constructor() {
        this.accessToken = localStorage.getItem('access_token');
        this.refreshToken = localStorage.getItem('refresh_token');
        this.baseUrl = 'https://ecomerce-plantilla-back-1.onrender.com';
    }

    // Hacer requests autenticadas
    async makeAuthenticatedRequest(url, options = {}) {
        // Asegurarse de usar la URL completa
        const fullUrl = url.startsWith('http') ? url : this.baseUrl + url;

        // Headers existentes + Authorization
        let headers = {
            ...options.headers,
            'Authorization': `Bearer ${this.accessToken}`
        };

        let response = await fetch(fullUrl, { ...options, headers });

        // Si el token expiró, intentar refresh
        if (response.status === 401) {
            const refreshed = await this.refreshAccessToken();
            if (refreshed) {
                headers['Authorization'] = `Bearer ${this.accessToken}`;
                response = await fetch(fullUrl, { ...options, headers });
            }
        }

        return response;
    }

    // Renovar token
    async refreshAccessToken() {
        if (!this.refreshToken) return false;

        try {
            const response = await fetch(`${this.baseUrl}/admin_auth/refresh`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.refreshToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.accessToken = data.access_token; // ⚠️ coincidir con el nombre devuelto por tu backend
                localStorage.setItem('access_token', this.accessToken);
                return true;
            }
        } catch (err) {
            console.error('Error renovando token:', err);
        }
        return false;
    }

    // Login
    async login(name_admin, password) {
        const response = await fetch(`${this.baseUrl}/admin_auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name_admin, password })
        });

        const data = await response.json();
        if (response.ok) {
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            localStorage.setItem('access_token', this.accessToken);
            localStorage.setItem('refresh_token', this.refreshToken);
            return data;
        } else {
            throw new Error(data.error || 'Error en login');
        }
    }

    // Logout
    async logout() {
        try {
            await this.makeAuthenticatedRequest(`${this.baseUrl}/admin_auth/logout`, { method: 'POST' });
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            this.accessToken = null;
            this.refreshToken = null;
        }
    }
}

export default AuthService;

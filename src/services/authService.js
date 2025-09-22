// Ejemplo de uso desde el frontend

class AuthService {
    constructor() {
        this.accessToken = localStorage.getItem('access_token');
        this.refreshToken = localStorage.getItem('refresh_token');
    }


async makeAuthenticatedRequest(url, options = {}) {
    //Intentar peticion con token actual
    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${this.accessToken}`
        }
    });

    //Si el token expiro, intentar renovarlo
    if (response.status === 401) {
        const refreshed = await this.refreshAccessToken();

        if (refreshed) {
            // Reintentar peticion con un nuevo token
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization' : `Bearer ${this.accessToken}`
                }
            });
        }
    }
    return response;
}

async refreshAccessToken() {
    try {
        const response = await fetch('/refresh', {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${this.refreshToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            this.accessToken = data.accessToken;
            localStorage.setItem('access_token', this.accessToken);
            return true;
        }
    } catch (error) {
        console.error('Error renovando token:', error);
    }
    return false;
}

}
"use client"
import { useEffect, ReactNode } from 'react';
import { PORT_BACKEND } from '@/constants';


interface DecodedToken {
    exp: number;
    [key: string]: any;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token-appointment-app');
            if (!token) {
                window.location.href = '/auth/login';
                return;
            }

            try {
                const tokenParts = token.split('.');
                const encodedPayload = tokenParts[1];
                const decodedPayload = atob(encodedPayload);
                const decodedToken: DecodedToken = JSON.parse(decodedPayload);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem('token-appointment-app');
                    window.location.href = '/auth/login';
                    return;
                }

                // Si el token expira en los próximos 5 minutos (300 segundos), renuevalo
                if (decodedToken.exp - currentTime < 300) {
                    const res = await fetch(`${PORT_BACKEND}/auth/renew-token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    const data = await res.json();
                    if (res.ok) {
                        localStorage.setItem('token-appointment-app', data.token);
                    } else {
                        console.error('Error al renovar el token:', data.error);
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                    }
                }
            } catch (error) {
                console.error('Error al verificar el token:', error);
                localStorage.removeItem('token-appointment-app');
                window.location.href = '/auth/login';
            }
        };

        checkToken();

        const interval = setInterval(checkToken, 60000); // Verificar el token cada minuto
        return () => clearInterval(interval);
    }, []);

    return children;
}

export default AuthProvider
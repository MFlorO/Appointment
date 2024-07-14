import { PORT_BACKEND } from '@/constants';

export async function getProfileData() {

    const token = localStorage.getItem('token-appointment-app');

    if (!token) throw new Error('No hay token almacenado');

    try {
        const response = await fetch(`${PORT_BACKEND}/perfil`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener los datos del perfil');
        }

        const data = await response.json();
        return data.user;

    } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Unknown error');
        }
    }
}
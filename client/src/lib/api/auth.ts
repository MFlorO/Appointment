import { PORT_BACKEND } from '@/constants';


export async function signup(
  nombre: string, apellido:string, dni:string, domicilio:string, email: string, area: string, telefono: string,  password: string, 
  isObraSocial:string, obraSocialId:number, numeroAfiliado: string, plan:string 
) {

  const response = await fetch(`${PORT_BACKEND}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, apellido, dni, domicilio, email, area, telefono, password, isObraSocial, obraSocialId, numeroAfiliado, plan }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al registrar el usuario');
  }

  return response.json();
}



export const login = async (dni: string, password: string) => {
  try {
    const res = await fetch(`${PORT_BACKEND}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dni, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    return data;
  } catch (error) {
    // Type guard to ensure `error` is an instance of Error
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error');
    }
  }
};

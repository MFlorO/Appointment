

export async function signup(email: string, password: string) {
  const response = await fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
}


export const login = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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

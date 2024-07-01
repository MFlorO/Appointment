
export async function getObrasSociales() {

  const response = await fetch('http://localhost:3001/obrasociales', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al cargar las obras sociales');
  }

  return response.json();
}
  
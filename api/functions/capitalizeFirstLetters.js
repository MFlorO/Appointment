
function capitalizeFirstLetters(str) {
  return str
  .toLowerCase() // Convertir toda la cadena a minúsculas
  .split(' ') // Dividir la cadena en palabras
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
  .join(' '); // Unir las palabras de nuevo en una cadena
}


module.exports = capitalizeFirstLetters;
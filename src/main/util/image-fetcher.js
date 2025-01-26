/**
 * Devuelve la URL de la imagen correspondiente a un hechizo o habilidad.
 * @param {string} name - Nombre del hechizo o habilidad.
 * @param {string} type - Tipo de imagen ("spell" o "ultimate").
 * @param {string} championName - Nombre del campeón (solo para habilidades ultimate).
 * @returns {string} - URL de la imagen.
 */
export const imageFetcher = (name, type) => {
    const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img';
    
    if (type === 'spell') {
      return `${BASE_URL}/spell/Summoner${name}.png`;
    }
  
    if (type === 'ultimate') {
      return `${BASE_URL}/spell/${name}`;
    }
  
    console.error('Invalid parameters passed to imageFetcher:', { name, type });
    return '';
  };

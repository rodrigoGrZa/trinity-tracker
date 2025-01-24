/**
 * Devuelve el nombre sin espacios, respetando las mayúsculas iniciales de cada palabra.
 * @param {string} name - Nombre que debe ser formateado.
 * @returns {string} - Nombre formateado sin espacios.
 */
export const formatChampionName = (name) => {
    if (!name) {
        console.error('El nombre proporcionado está vacío o es inválido.');
        return '';
    }

    // Eliminar espacios y mantener mayúsculas iniciales.
    return name.replace(/\s+/g, '');
};

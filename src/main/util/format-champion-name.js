export const formatChampionName = (name) => {
    if (!name) {
        console.error('El nombre proporcionado está vacío o es inválido.');
        return '';
    }

    return name.replace(/\s+/g, '');
};

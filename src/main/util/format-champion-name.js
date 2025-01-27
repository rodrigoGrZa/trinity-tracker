export const formatChampionName = (name) => {
    if (typeof name !== 'string' || !name.trim()) {
        console.error('El nombre proporcionado está vacío o es inválido.');
        return '';
    }

    return name
        .split('')
        .reduce((result, char, index) => {
            if (/[a-zA-Z]/.test(char)) {
                if (result.convertNextToLowercase) {
                    result.output += char.toLowerCase();
                    result.convertNextToLowercase = false;
                } else {
                    result.output += (result.output && result.output[result.output.length - 1] !== ' ')
                        ? char
                        : char.toUpperCase();
                }
            } else if (char === "'") {
                result.convertNextToLowercase = true;
            }
            return result;
        }, { output: '', convertNextToLowercase: false })
        .output
        .replace(/\s+/g, '');
};
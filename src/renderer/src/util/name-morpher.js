const nameMorpher = (name) => {
    if (name === 'Unleashed Teleport') {
        return 'Teleport';
    }

    if (name === 'Primal Smite') {
        return 'Smite';
    }

    if (name === 'Unleashed Smite') {
        return 'Smite';
    }

    if (name === 'Wukong') {
        return 'MonkeyKing';
    }

    if (name === 'Ignite') {
        return 'Dot';
    }

    if (name === 'Cleanse') {
        return 'Boost';
    }

    if (name === 'Ghost') {
        return 'Haste';
    }

    return name;    
}

export {nameMorpher};
const nameMorpher = (name) => {
    if (name === 'Unleashed Teleport') {
        return 'Teleport';
    }

    if (name === 'Primal Smite') {
        return 'Smite';
    }
    
    if (name === "Mark") {
        return 'SnowURFSnowball_Mark';
    }

    if (name === 'Unleashed Smite') {
        return 'Smite';
    }

    if (name === 'Clarity') {
        return 'Mana';
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

    if (name === 'Renata Glasc') {
        return 'Renata';
    }
    
    if (name === "K'Sante") {
        return 'KSante';
    }

    if (name === "Kai'Sa") {
        return 'Kaisa';
    }

    return name;    
}

export {nameMorpher};
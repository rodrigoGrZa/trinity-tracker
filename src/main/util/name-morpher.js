const nameMorpher = (name) => {
    const morphs = {
      'Unleashed Teleport': 'Teleport',
      'Primal Smite': 'Smite',
      Mark: 'SnowURFSnowball_Mark',
      'Unleashed Smite': 'Smite',
      Clarity: 'Mana',
      Wukong: 'MonkeyKing',
      Ignite: 'Dot',
      Cleanse: 'Boost',
      Ghost: 'Haste',
      'Renata Glasc': 'Renata',
      "K'Sante": 'KSante',
      "Kai'Sa": 'Kaisa',
    };
  
    return morphs[name] || name;
  };

export {nameMorpher};
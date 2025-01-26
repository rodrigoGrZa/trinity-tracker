import React from 'react';
import Spell from './spell';
import { useState, useEffect } from 'react';

const Champion = ({ champion }) => {
  const getUltimateCooldown = (level) => {
    if (level < 11) return champion.ultimateCooldown[0];
    if (level >= 11 && level < 16) return champion.ultimateCooldown[1];
    return champion.ultimateCooldown[2];
  };
  const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          const url = await window.api.fetchImage(champion.championIcon, 'champion');
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
  
      fetchImage();
    }, [champion.championIcon]);

  return (
    <div className="champion-card">
      <div className="champion-info">
        <img src={imageUrl} className="champion-name" />
        <div className="summoner-spells">
          <Spell spellIcon={champion.summonerSpells.spellOne.displayName} cooldown={champion.summonerSpells.spellOne.cooldownBase} type={'spell'} />
          <Spell spellIcon={champion.summonerSpells.spellTwo.displayName} cooldown={champion.summonerSpells.spellTwo.cooldownBase} type={'spell'} />
          <Spell spellIcon={champion.ultimateIcon} cooldown={getUltimateCooldown(champion.level)} type={'ultimate'} />
        </div>
      </div>
    </div>
  );
};

export default Champion;
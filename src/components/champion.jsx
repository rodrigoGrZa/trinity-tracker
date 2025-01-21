import React from 'react';
import Spell from './spell';

const Champion = ({ champion }) => {
  const getUltimateCooldown = (level) => {
    if (level < 11) return champion.ultimateCooldown[0];
    if (level >= 11 && level < 16) return champion.ultimateCooldown[1];
    return champion.ultimateCooldown[2];
  };

  return (
    <div className="champion-card">
      <div className="champion-info">
        <img src={"https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/" + champion.championIcon} className="champion-name" />
        <div className="summoner-spells">
          <Spell spellIcon={champion.summonerSpells.spellOne.displayName} cooldown={champion.summonerSpells.spellOne.cooldownBase} type={'spell'} />
          <Spell spellIcon={champion.summonerSpells.spellTwo.displayName} cooldown={champion.summonerSpells.spellOne.cooldownBase} type={'spell'} />
          <Spell spellIcon={champion.ultimateIcon} cooldown={getUltimateCooldown(champion.level)} type={'ultimate'} />
        </div>
      </div>
    </div>
  );
};

export default Champion;
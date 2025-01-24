import React from 'react';
import useCooldown from '../hooks/use-cooldown';
import { imageFetcher } from '../util/image-fetcher';
import { nameMorpher } from '../util/name-morpher';

const Spell = ({ spellIcon, cooldown, type, }) => {
  const { isOnCooldown, timeRemaining, startCooldown } = useCooldown(cooldown);

  const imageUrl = imageFetcher(nameMorpher(spellIcon), type);

  return (
    <div
      className="spell"
      onClick={startCooldown}
      style={{
        position: 'relative',
        width: '32px',
        height: '32px',
      }}
    >
      {/* Spell image */}
      <img
        src={imageUrl}
        alt="Spell"
        style={{
          opacity: isOnCooldown ? 0.5 : 1,
          transition: 'opacity 0.3s linear',
        }}
      />

      {/* Ramaining cooldown */}
      {isOnCooldown && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          {timeRemaining !== undefined && !isNaN(timeRemaining) ? `${timeRemaining}s` : '0s'}
        </div>
      )}
    </div>
  );
};

export default Spell;

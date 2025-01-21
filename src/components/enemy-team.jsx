import React from 'react';
import Champion from './champion';
import useEnemyChampions from '../hooks/use-enemy-champions';

const EnemyTeam = ({ activePlayer, allChampions }) => {
    const enemyChampions = useEnemyChampions(activePlayer, allChampions);
    return (
      <div className="enemy-team">
        {enemyChampions.length === 0 ? (
          <p>No enemies found</p>
        ) : (
          enemyChampions.map((champion, index) => (
            <Champion key={index} champion={champion} />
          ))
        )}
      </div>
    );
  };
  
  export default EnemyTeam;
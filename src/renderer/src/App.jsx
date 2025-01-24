import React from 'react';
import useActivePlayer from './hooks/use-active-player';
import useEnemyChampions from './hooks/use-enemy-champions';
import EnemyTeam from './components/enemy-team';

const App = () => {
  const activePlayer = useActivePlayer();
  const enemyChampions = useEnemyChampions(activePlayer?.summonerName);

  if (!activePlayer) {
    return <p>Buscando jugador activo...</p>;
  } else {
    return (
      <div>
        <EnemyTeam activePlayer={activePlayer} allChampions={enemyChampions} />
      </div>
    );
  }
};

export default App;


import { useState, useEffect } from 'react';

const useEnemyChampions = (summonerName) => {
  const [enemyChampions, setEnemyChampions] = useState([]);

  useEffect(() => {
    const getEnemyData = async () => {
      try {
        // Llama a las funciones expuestas en el preload
        const cooldownData = await window.championService.fetchSummonerSpells();
        const champions = await window.championService.fetchEnemyChampions(summonerName, cooldownData);
        setEnemyChampions(champions);
      } catch (error) {
        console.error('Error fetching enemy champions:', error);
      }
    };

    if (summonerName) {
      getEnemyData();
    }
  }, [summonerName]);

  return enemyChampions;
};

export default useEnemyChampions;


import { useState, useEffect } from 'react';
import { fetchSummonerSpellData, fetchEnemyChampionsData } from '../services/champion-service';

const  useEnemyChampions = (summonerName) => {
  const [enemyChampions, setEnemyChampions] = useState([]);

  useEffect(() => {
    const getEnemyData = async () => {
      const cooldownData = await fetchSummonerSpellData();
      const champions = await fetchEnemyChampionsData(summonerName.summonerName, cooldownData);
      setEnemyChampions(champions);
    };

    if (summonerName) {
      getEnemyData();
    }
  }, [summonerName]);

  return enemyChampions;
};

export default useEnemyChampions;

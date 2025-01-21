import { useState, useEffect } from 'react';
import { fetchActivePlayerData } from '../services/champion-service';

const useActivePlayer = () => {
  const [activePlayer, setActivePlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const player = await fetchActivePlayerData();
      if (player) {
        setActivePlayer(player);
      } else {
        setActivePlayer()
      }
    };

    const intervalId = setInterval(fetchData, 300);

    return () => clearInterval(intervalId);
  }, []);

  return activePlayer;
};

export default useActivePlayer;

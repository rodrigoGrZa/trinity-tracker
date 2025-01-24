import { useState, useEffect } from 'react';

const useActivePlayer = () => {
  const [activePlayer, setActivePlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llama a la función expuesta en el preload
        const player = await window.championService.fetchActivePlayer();
        setActivePlayer(player || null);
      } catch (error) {
        console.error('Error fetching active player:', error);
        setActivePlayer(null);
      }
    };

    // Configura un intervalo para actualizar los datos cada segundo
    const intervalId = setInterval(fetchData, 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return activePlayer;
};

export default useActivePlayer;

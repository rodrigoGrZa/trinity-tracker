import axios from 'axios';
import { formatChampionName } from '../util/format-champion-name';
import { nameMorpher } from '../util/name-morpher';
import api from './api';

const API_URLS = {
  SUMMONER_SPELLS: 'https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/summoner.json',
  CHAMPION_SPELLS: 'https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion/',
  ACTIVE_PLAYER: '/liveclientdata/activeplayername',
  PLAYER_LIST: '/liveclientdata/playerlist',
};

/**
 * Manejo centralizado de errores.
 * @param {Function} callback - Función que ejecutará la lógica principal.
 * @param {any} fallbackValue - Valor a retornar en caso de error.
 * @returns {Promise<any>} - Resultado de la función o valor por defecto.
 */
const safeFetch = async (callback, fallbackValue = null) => {
  try {
    return await callback();
  } catch (error) {
    console.error(error);
    return fallbackValue;
  }
};

/**
 * Obtiene los datos de los hechizos de invocador desde Data Dragon.
 * @returns {Promise<Object>} - Objeto con los nombres de los hechizos como claves y su enfriamiento base como valores.
 */
const fetchSummonerSpellData = async () =>
  safeFetch(async () => {
    const response = await axios.get(API_URLS.SUMMONER_SPELLS);
    const spells = response.data?.data || {};
    return Object.values(spells).reduce((acc, spell) => {
      acc[spell.name] = spell.cooldown[0];
      return acc;
    }, {});
  }, {});

/**
 * Obtiene el nombre del jugador activo desde la API del cliente en vivo.
 * @returns {Promise<Object|null>} - Objeto con el nombre del jugador activo o `null` si hay un error.
 */
const fetchActivePlayerData = async () =>
  safeFetch(async () => {
    const response = await api.get(API_URLS.ACTIVE_PLAYER);
    return { summonerName: response.data };
  });

/**
 * Obtiene los datos de los campeones enemigos, incluyendo sus habilidades definitivas.
 * @param {string} summonerName - Nombre del jugador activo.
 * @param {Object} cooldownData - Datos de enfriamiento de los hechizos de invocador.
 * @returns {Promise<Array>} - Lista de campeones enemigos con sus datos.
 */
const fetchEnemyChampionsData = async (summonerName, cooldownData) =>
  safeFetch(async () => {
    const response = await api.get(API_URLS.PLAYER_LIST);
    const activeGame = response.data || [];

    // Identificar el equipo del jugador activo
    const activePlayerTeam = activeGame.find(
      (player) => player.summonerName === summonerName.summonerName
    )?.team;

    // Filtrar los campeones del equipo enemigo
    const enemyTeam = activeGame.filter(
      (player) => player.team !== activePlayerTeam
    );

    // Procesar los datos de los campeones enemigos
    return await Promise.all(
      enemyTeam.map((participant) =>
        getEnemyChampionData(participant, cooldownData)
      )
    );
  }, []);

/**
* Maneja los datos de un campeón enemigo.
* @param {Object} participant - Datos del participante enemigo.
* @param {Object} cooldownData - Datos de enfriamiento de los hechizos de invocador.
* @returns {Promise<Object>} - Datos del campeón enemigo procesados.
*/
const getEnemyChampionData = async (participant, cooldownData) => {
  const defaultChampionData = {
    championName: participant.championName,
    ultimateName: 'Unknown',
    ultimateCooldown: ['Unknown'],
    summonerSpells: {
      spellOne: participant.summonerSpells?.summonerSpellOne || {},
      spellTwo: participant.summonerSpells?.summonerSpellTwo || {},
    },
  };

  return safeFetch(async () => {
    const championName = formatChampionName(nameMorpher(participant.championName));
    const championResponse = await axios.get(
      `${API_URLS.CHAMPION_SPELLS}${championName}.json`
    );
    const championData = championResponse.data.data[championName];
    const ultimateAbility = championData.spells[3];

    return {
      championName,
      championIcon: championData.image.full,
      ultimateIcon: ultimateAbility?.image.full || 'Unknown',
      ultimateName: ultimateAbility?.name || 'Unknown',
      ultimateCooldown: ultimateAbility?.cooldown || ['Unknown'],
      level: participant.level,
      summonerSpells: {
        spellOne: {
          ...participant.summonerSpells?.summonerSpellOne,
          cooldownBase:
            cooldownData[participant.summonerSpells?.summonerSpellOne?.displayName] || 'Unknown',
        },
        spellTwo: {
          ...participant.summonerSpells?.summonerSpellTwo,
          cooldownBase:
            cooldownData[participant.summonerSpells?.summonerSpellTwo?.displayName] || 'Unknown',
        },
      },
    };
  }, defaultChampionData);
};

export { fetchSummonerSpellData, fetchActivePlayerData, fetchEnemyChampionsData };

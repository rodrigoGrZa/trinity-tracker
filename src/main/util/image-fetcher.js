export const imageFetcher = (name, type) => {
  const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img';

  switch (type) {
    case 'spell':
      return `${BASE_URL}/spell/Summoner${name}.png`;
    case 'ultimate':
      return `${BASE_URL}/spell/${name}`;
    case 'champion':
      return `${BASE_URL}/champion/${name}`;
    default:
      console.error('Invalid parameters passed to imageFetcher:', { name, type });
      return '';
  }
};
// didnt extract creds to env for ease of checking and its only temporary repo
const API_URL = `https://www.superheroapi.com/api.php/6081641058525838`;

export const API_PATHS = {
  SEARCH_HEROES: (query: string) => `${API_URL}/search/${query}`,
  GET_HERO_BY_ID: (id: string) => `${API_URL}/${id}`
};
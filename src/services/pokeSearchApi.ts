import { IPokemon } from "../types/IPokemon";

const urls = [
  "https://pokeapi.co/api/v2/pokemon/"
  // 'https://pokeapi.co/api/v2/pokemon-species/'
];

export async function searchPokemon(searchText: string) {

  // pokemonApi can search by name or pokeNumber
  try {
    const requests = urls.map(base => tryFetch(`${base}${searchText}`));
    const results = await Promise.all(requests);
    const failure = results.find(x => !(x.success && x.data));
    if (failure) return failure;
    const [main] = results;

    const {
      data: { name, sprites, types }
    } = main as any;

    const data: IPokemon = {
        name,
        imageUrl: sprites.front_default,
        types: types.map(x => ({name: x.type.name, id: x.type.name})),
        description: "pokemon"
    }

    return { success: true, data };
  } catch (error) {
    console.warn("ERROR", error);
    return { success: false, error };
  }
}

async function tryFetch(url: string) {
  try {
    const response = await fetch(url);
    if (response.status < 200 || response.status >= 300) {
      const error = await response.text();
      console.warn({ message: "API ERROR", url, error });
      return { success: false, error };
    }
    return { success: true, data: await response.json() };
  } catch (error) {
    console.warn({ message: "API ERROR", url, error });
    return { success: false, error };
  }
}


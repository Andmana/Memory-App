class Pokemon {
    constructor(id, name, imgUrl) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}

const fetchPokemonById = async (id, uniquePokemonIds = []) => {
    if (uniquePokemonIds.includes(id)) return null; // Use includes for array

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
            { mode: "cors" }
        );
        const data = await response.json();
        uniquePokemonIds.push(id); // Use push to add to array
        return {
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.front_default,
        };
    } catch (error) {
        console.error("Error fetching Pokémon:", error.message);
        return null;
    }
};

const fetchRandomPokemon = async (count) => {
    const uniquePokemonIds = []; // Use array for unique IDs
    const pokemonList = [];

    while (pokemonList.length < count) {
        const id = Math.floor(Math.random() * 1025) + 1;
        const pokemon = await fetchPokemonById(id, uniquePokemonIds);
        if (pokemon) pokemonList.push(pokemon);
    }

    return pokemonList;
};

const regeneratePokemonList = async (_pokemonList, uniquePokemonIds) => {
    const pokemonList = [..._pokemonList.slice(0, 8)];

    while (pokemonList.length < 12) {
        const id = Math.floor(Math.random() * 1025) + 1;
        const pokemon = await fetchPokemonById(id, uniquePokemonIds);
        if (pokemon) pokemonList.push(pokemon);
    }

    return pokemonList;
};

const shufflePokemons = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
};

export { Pokemon, fetchRandomPokemon, shufflePokemons, regeneratePokemonList };

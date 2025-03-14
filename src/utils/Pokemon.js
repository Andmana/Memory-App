class Pokemon {
    constructor(id, name, imgUrl) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}

const fetchRandomPokemon = async (count) => {
    const uniquePokemonIds = new Set(); // Use Set for faster lookup of unique IDs
    const pokemonList = [];

    while (pokemonList.length < count) {
        const id = Math.floor(Math.random() * 1025) + 1;

        // Skip if ID is already in the set
        if (uniquePokemonIds.has(id)) continue;

        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const data = await response.json(); // Await to get the parsed response

            // Create a new Pokemon object and add it to the list
            const pokemon = {
                id: data.id,
                name: data.name,
                imageUrl: data.sprites.front_default,
            };

            // Add ID to the set and Pokémon to the list
            uniquePokemonIds.add(id);
            pokemonList.push(pokemon);
        } catch (error) {
            console.log("Error fetching Pokémon:", error.message);
        }
    }

    return pokemonList; // Return the list of fetched Pokémon
};

const shufflePokemons = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
};

export { Pokemon, fetchRandomPokemon, shufflePokemons };

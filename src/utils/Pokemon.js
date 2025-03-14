class Pokemon {
    constructor(id, name, imgUrl) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}

const fetchRandomPokemon = async (count) => {
    const uniquePokemonIds = new Set();
    const pokemonList = [];

    while (pokemonList.length < count) {
        const id = Math.floor(Math.random() * 1025) + 1;

        if (uniquePokemonIds.has(id)) continue;

        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${id}`,
                { mode: "cors" }
            );
            const data = await response.json();

            const image = await fetch(data.sprites.front_default, {
                mode: "cors",
            });

            const pokemon = {
                id: data.id,
                name: data.name,
                imageUrl: data.sprites.front_default,
            };

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

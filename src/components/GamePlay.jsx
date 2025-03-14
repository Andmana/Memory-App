import { Value } from "sass";
import Card from "./Card";
import { fetchRandomPokemon } from "../utils/Pokemon";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const totalCards = {
    easy: 3,
    medium: 5,
    hard: 10,
};

const GamePlay = ({ difficulty }) => {
    let cardDifficulty = totalCards[difficulty];
    const [pokemonLists, setPokemonLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchPokemonData = async () => {
    //         try {
    //             // Assuming fetchRandomPokemon is a function that fetches Pokémon data
    //             const data = await fetchRandomPokemon(cardDifficulty);
    //             setPokemonLists(data); // Store the fetched data in state
    //         } catch (error) {
    //             console.error("Error fetching Pokémon data:", error);
    //         }
    //     };

    //     fetchPokemonData(cardDifficulty); // Call the async function
    // }, [cardDifficulty]);

    console.log("pokemonLists", pokemonLists);
    // if (isLoading) return <Loading />;
    return <Loading />;

    // return (
    //     <>
    //         <header>
    //             <div>
    //                 <button className="btn">BACK</button>
    //             </div>
    //             <div>
    //                 <div className="game-mode">Difficulty</div>
    //                 <div className="game-mode__value">Trainer</div>
    //                 <div className="game-score">0/1</div>
    //             </div>
    //             <div className="mascot">Pikachu</div>
    //         </header>
    //         <section>
    //             <div className="cards-container">
    //                 {pokemonLists.map((pokemon) => (
    //                     <Card
    //                         key={pokemon.id}
    //                         name={pokemon.name}
    //                         imgUrl={pokemon.imgUrl}
    //                     />
    //                 ))}
    //             </div>
    //         </section>
    //     </>
    // );
};

export default GamePlay;

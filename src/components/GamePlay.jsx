import Card from "./Card";
import { fetchRandomPokemon } from "../utils/Pokemon";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import "../styles/gameplay.scss";

const totalCards = {
    easy: 3,
    medium: 5,
    hard: 10,
};

const GamePlay = ({ difficulty }) => {
    const cardDifficulty = totalCards[difficulty];
    const [pokemonLists, setPokemonLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const data = await fetchRandomPokemon(cardDifficulty);
                setPokemonLists(data);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemonData();
    }, [cardDifficulty]);
    console.log("pokemonList", pokemonLists);

    if (isLoading) return <Loading />;
    return (
        <div className="gameplay-container">
            <div className="gameplay-header">
                <div>
                    <button className="btn">BACK</button>
                </div>
                <div>
                    <div className="game-mode">Difficulty</div>
                    <div className="game-mode__value">Trainer</div>
                    <div className="game-score">0/1</div>
                </div>
                <div className="mascot">Pikachu</div>
            </div>
            <div className="gameplay-content">
                <div className="cards-container">
                    {pokemonLists.map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            name={pokemon.name}
                            imageUrl={pokemon.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePlay;

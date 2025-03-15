import React, { useEffect, useState } from "react";
import { fetchRandomPokemon, shufflePokemons } from "../utils/Pokemon";
import Loading from "./Loading";
import "../styles/gameplay.scss";
import Cards from "./Cards";

// Difficulty configuration
const DIFFICULTIES = {
    easy: {
        cards: 4,
        name: "Pidgey",
    },
    medium: {
        cards: 8,
        name: "Charizard",
    },
    hard: {
        cards: 12,
        name: "Arceus",
    },
};

const GamePlay = ({ difficulty, handleSetState }) => {
    const { cards: numberOfCards, name: difficultyName } =
        DIFFICULTIES[difficulty];

    // State variables
    const [isCardFlipped, setIsCardFlipped] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pickedIds, setPickedIds] = useState([]);

    // Handle card selection
    const handlePickedCard = ({ target }) => {
        setIsCardFlipped(true); // Flip cards face-up

        const cardId = parseInt(target.dataset.id);
        setPickedIds([...pickedIds]); // Update picked card IDs

        // Shuffle Pokémon list after a delay
        setTimeout(() => {
            setPokemonList(shufflePokemons([...pokemonList]));
        }, 500);

        // Flip cards back face-down after a delay
        setTimeout(() => {
            setIsCardFlipped(false);
        }, 1500);
    };

    // Fetch Pokémon data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await fetchRandomPokemon(numberOfCards);
                setPokemonList(pokemonData); // Set fetched Pokémon data
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                // Hide loading spinner and flip cards after delays
                setTimeout(() => setIsLoading(false), 1000);
                setTimeout(() => setIsCardFlipped(false), 1500);
            }
        };
        fetchData();
    }, [numberOfCards]);

    // Show loading spinner while data is being fetched
    if (isLoading) return <Loading difficulty={DIFFICULTIES[difficulty]} />;

    return (
        <div className="gameplay-container">
            {/* Game header */}
            <div
                className={`gameplay-header bg-${difficultyName.toLowerCase()}`}
            >
                <div>
                    <button className="btn" onClick={() => handleSetState(1)}>
                        BACK
                    </button>
                </div>
                <div>
                    <div className="game-mode">DIFFICULTY</div>
                    <div className="game-mode__value">
                        {difficulty.toString().toUpperCase()}
                    </div>
                    <div className="game-score">0/{numberOfCards}</div>
                </div>
                <div className="mascot">{difficultyName.toUpperCase()}</div>
            </div>

            {/* Game content */}
            <div className="gameplay-content">
                <Cards
                    pokemonList={pokemonList}
                    isCardFlipped={isCardFlipped}
                    handlePickedCard={handlePickedCard}
                />
            </div>
        </div>
    );
};

export default GamePlay;

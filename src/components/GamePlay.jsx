import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchRandomPokemon, shufflePokemons } from "../utils/Pokemon";
import Loading from "./Loading";
import "../styles/gameplay.scss";

// Difficulty levels and their corresponding number of cards
const TOTAL_CARDS_BY_DIFFICULTY = {
    easy: 3,
    medium: 5,
    hard: 10,
};

const GamePlay = ({ difficulty, handleSetState }) => {
    const numberOfCards = TOTAL_CARDS_BY_DIFFICULTY[difficulty];
    const [isCardFlipped, setIsCardFlipped] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pickedCardIds, setPickedCardIds] = useState([]);

    // Fetch Pokémon data and flip cards after a delay
    useEffect(() => {
        let flipDelay; // Timer for flipping cards

        const fetchData = async () => {
            try {
                const pokemonData = await fetchRandomPokemon(numberOfCards);
                setPokemonList(pokemonData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
                setIsLoading(false);
            } finally {
                // Flip cards back face-down after 500ms
                flipDelay = setTimeout(() => {
                    setIsCardFlipped(false);
                }, 500);
            }
        };

        fetchData();

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(flipDelay);
        };
    }, [numberOfCards]); // Re-run effect when `numberOfCards` changes

    // Handle card selection
    const handleCardPick = ({ target }) => {
        const cardId = parseInt(target.dataset.id);
        setPickedCardIds((prevIds) => [...prevIds, cardId]); // Use functional update for state
    };

    // Flip cards and shuffle after a card is picked
    useEffect(() => {
        if (pickedCardIds.length === 0) return; // Skip initial render

        setIsCardFlipped(true); // Flip all cards face-up

        const shuffleDelay = setTimeout(() => {
            const shuffledPokemon = shufflePokemons([...pokemonList]); // Shuffle the Pokémon list
            setPokemonList(shuffledPokemon);

            // Flip cards back face-down after 500ms
            const flipBackDelay = setTimeout(() => {
                setIsCardFlipped(false);
            }, 500);

            // Cleanup flip-back timer
            return () => clearTimeout(flipBackDelay);
        }, 500);

        // Cleanup shuffle timer
        return () => clearTimeout(shuffleDelay);
    }, [pickedCardIds.length, pokemonList]); // Re-run effect when `pickedCardIds.length` changes

    // Show loading spinner while data is being fetched
    if (isLoading) return <Loading />;

    return (
        <div className="gameplay-container">
            {/* Game header */}
            <div className="gameplay-header">
                <div>
                    <button className="btn" onClick={() => handleSetState(1)}>
                        BACK
                    </button>
                </div>
                <div>
                    <div className="game-mode">Difficulty</div>
                    <div className="game-mode__value">Trainer</div>
                    <div className="game-score">0/1</div>
                </div>
                <div className="mascot">Pikachu</div>
            </div>

            {/* Game content */}
            <div className="gameplay-content">
                <div className="cards-container">
                    {pokemonList.map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            imageUrl={pokemon.imageUrl}
                            isCardFlipped={isCardFlipped}
                            handlePickCard={handleCardPick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePlay;

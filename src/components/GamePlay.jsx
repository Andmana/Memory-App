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

const GamePlay = ({ difficulty }) => {
    const numberOfCards = TOTAL_CARDS_BY_DIFFICULTY[difficulty];
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pickedCardIds, setPickedCardIds] = useState([]);

    // Handle card selection
    const handleCardPick = ({ target }) => {
        const cardId = parseInt(target.dataset.id);
        setPickedCardIds([...pickedCardIds, cardId]);
    };

    // Flip cards and shuffle after a card is picked
    useEffect(() => {
        setIsCardFlipped(true); // Flip all cards face-up

        const shuffledPokemon = shufflePokemons([...pokemonList]); // Shuffle the Pokémon list
        const flipTimer = setTimeout(() => {
            setPokemonList(shuffledPokemon); // Update the list with shuffled Pokémon
            setTimeout(() => {
                setIsCardFlipped(false); // Flip cards back face-down
            }, 500);
        }, 500);

        return () => clearTimeout(flipTimer); // Cleanup timer
    }, [pickedCardIds.length]);

    // Fetch Pokémon data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await fetchRandomPokemon(numberOfCards);
                setPokemonList(pokemonData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [numberOfCards]);

    // Show loading spinner while data is being fetched
    if (isLoading) return <Loading />;

    return (
        <div className="gameplay-container">
            {/* Game header */}
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

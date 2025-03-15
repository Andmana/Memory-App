import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchRandomPokemon, shufflePokemons } from "../utils/Pokemon";
import Loading from "./Loading";
import "../styles/gameplay.scss";
import Cards from "./Cards";

const TOTAL_CARDS_BY_DIFFICULTY = {
    easy: 3,
    medium: 5,
    hard: 10,
};

const GamePlay = ({ difficulty, handleSetState }) => {
    const numberOfCards = TOTAL_CARDS_BY_DIFFICULTY[difficulty];

    const [isCardFliped, setIsCardFlipped] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pickedIds, setPickedIds] = useState([]);

    const handlePickedCard = ({ target }) => {
        setIsCardFlipped(true);

        const cardId = parseInt(target.dataset.id);
        setPickedIds([...pickedIds]);

        setTimeout(() => {
            setPokemonList(shufflePokemons([...pokemonList]));
        }, 500);

        setTimeout(() => {
            setIsCardFlipped(false);
        }, 1500);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await fetchRandomPokemon(numberOfCards);
                setPokemonList(pokemonData);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setIsLoading(false);
                setTimeout(() => {
                    setIsCardFlipped(false);
                }, 500);
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
                <Cards
                    pokemonList={pokemonList}
                    isCardFliped={isCardFliped}
                    handlePickedCard={handlePickedCard}
                />
            </div>
        </div>
    );
};

export default GamePlay;

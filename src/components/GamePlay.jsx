import "../styles/gameplay.scss";
import gameplayBGM from "../assets/musics/gameplay-bgm.mp3";

import { useEffect, useState } from "react";
import { fetchRandomPokemon, shufflePokemons } from "../utils/Pokemon";
import { STATE } from "../App";
import Loading from "./Loading";
import Cards from "./Cards";
import { flipSfx } from "../utils/Sfx";

// Difficulty configuration
const DIFFICULTIES = {
    EASY: {
        name: "EASY",
        pokemon: "PIDGEY",
        cards: 4,
    },
    MEDIUM: {
        name: "MEDIUM",
        pokemon: "CHARIZARD",
        cards: 8,
    },
    HARD: {
        name: "HARD",
        cards: 12,
        pokemon: "ARCEUS",
    },
};

const GamePlay = ({ difficulty, handleSetState, setBgm, isMusicPlaying }) => {
    const { cards: numberOfCards, pokemon: difficultyName } =
        DIFFICULTIES[difficulty];

    // State variables
    const [isCardFlipped, setIsCardFlipped] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pickedIds, setPickedIds] = useState([]);

    // Handle card selection
    const handlePickedCard = ({ target }) => {
        const cardId = parseInt(target.dataset.id);

        // Flip card face-up
        setIsCardFlipped(true);

        // Play sound effects if music is playing
        if (isMusicPlaying) flipSfx.play();

        // Check if the card has already been picked
        if (pickedIds.includes(cardId)) {
            handleSetState(STATE.LOSE); // Game over
            return; // Exit early
        }

        // Check for win condition
        if (pickedIds.length + 1 === numberOfCards) {
            handleSetState(STATE.WIN); // Game over
            return; // Exit early
        }

        setPickedIds([...pickedIds, cardId]); // Update picked card IDs

        // Shuffle Pokémon list after a delay
        setTimeout(() => {
            setPokemonList(shufflePokemons([...pokemonList]));

            // Flip cards back face-down after a delay
            setTimeout(() => {
                if (isMusicPlaying) flipSfx.play();
                setIsCardFlipped(false);
            }, 1000);
        }, 500);
    };

    // First Mount
    useEffect(() => setBgm(gameplayBGM), []);

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
                    <button
                        className="btn"
                        onClick={() => handleSetState(STATE.DIFFICULTY)}
                    >
                        BACK
                    </button>
                </div>
                <div>
                    <div className="game-mode">- DIFFICULTY -</div>
                    <div className="game-mode__value">
                        {difficulty.toString().toUpperCase()}
                    </div>
                    <div className="game-score">
                        {pickedIds.length}/{numberOfCards}
                    </div>
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

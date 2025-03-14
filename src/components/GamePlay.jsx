import Card from "./Card";
import { fetchRandomPokemon, shufflePokemons } from "../utils/Pokemon";
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
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [pokemonLists, setPokemonLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pickedIds, setPickedIds] = useState([]);

    const handlePickCard = ({ target }) => {
        const id = parseInt(target.dataset.id);
        setPickedIds([...pickedIds, id]);
    };

    // card flipped and fliped back
    useEffect(() => {
        setIsCardFlipped(true);
        const suffled = shufflePokemons([...pokemonLists]);
        const timer = setTimeout(() => {
            setPokemonLists(suffled);
            setIsCardFlipped(false);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [pickedIds.length]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const data = await fetchRandomPokemon(cardDifficulty);
                setIsLoading(false);
                setPokemonLists(data);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching Pokémon data:", error);
            }
        };
        fetchPokemonData();
    }, []);

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
                            id={pokemon.id}
                            name={pokemon.name}
                            imageUrl={pokemon.imageUrl}
                            isCardFlipped={isCardFlipped}
                            handlePickCard={handlePickCard}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePlay;

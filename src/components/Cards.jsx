import { shufflePokemons } from "../utils/Pokemon";
import Card from "./Card";

const Cards = ({ pokemonList, isCardFlipped, handlePickedCard }) => {
    return (
        <div className="cards-container">
            {pokemonList.map((pokemon) => (
                <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    imageUrl={pokemon.imageUrl}
                    isCardFlipped={isCardFlipped}
                    handlePickedCard={handlePickedCard}
                />
            ))}
        </div>
    );
};

export default Cards;

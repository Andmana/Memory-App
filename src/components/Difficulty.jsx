import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/difficulty.scss";

const Difficulty = ({ handleDifficulty }) => {
    return (
        <>
            <header className="difficulty-header">
                <img src={pokemonImg} alt="" />
                <img src={memoryImg} alt="" />
            </header>
            <section className="difficulty-section">
                <h1>Select Difficulty</h1>
                <div className="difficulty-buttons">
                    <button onClick={handleDifficulty} className="btn">
                        EASY
                    </button>
                    <button onClick={handleDifficulty} className="btn">
                        MEDIUM
                    </button>
                    <button onClick={handleDifficulty} className="btn">
                        HARD
                    </button>
                </div>
            </section>
        </>
    );
};

export default Difficulty;

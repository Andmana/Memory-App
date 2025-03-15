import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/difficulty.scss";

const Difficulty = ({ handleDifficulty }) => {
    return (
        <div className="difficulty-container">
            <header className="difficulty-header">
                <img src={pokemonImg} alt="" />
                <img src={memoryImg} alt="" />
            </header>
            <section className="difficulty-section">
                <h1>SELECT DIFFICULTY</h1>
                <div className="difficulty-buttons">
                    <button
                        onClick={handleDifficulty}
                        className="btn"
                        data-diff="easy"
                    >
                        EASY
                    </button>
                    <button
                        onClick={handleDifficulty}
                        className="btn"
                        data-diff="medium"
                    >
                        MEDIUM
                    </button>
                    <button
                        onClick={handleDifficulty}
                        className="btn"
                        data-diff="hard"
                    >
                        HARD
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Difficulty;

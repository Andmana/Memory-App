import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/difficulty.scss";

import difficultyBGM from "../assets/musics/difficulty-bgm.mp3";
import { useEffect } from "react";

const Difficulty = ({ setState, setDifficulty, setBgm }) => {
    const handleDifficulty = (diffulcty) => {
        setState(2);
        setDifficulty(diffulcty);
    };

    useEffect(() => setBgm(difficultyBGM), []);

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
                        onClick={() => handleDifficulty("EASY")}
                        className="btn"
                    >
                        EASY
                    </button>
                    <button
                        onClick={() => handleDifficulty("MEDIUM")}
                        className="btn"
                    >
                        MEDIUM
                    </button>
                    <button
                        onClick={() => handleDifficulty("HARD")}
                        className="btn"
                    >
                        HARD
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Difficulty;

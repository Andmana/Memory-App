import "../styles/results.scss";
import winBGM from "../assets/musics/win-bgm.mp3";
import loseBGM from "../assets/musics/lose-bgm.mp3";

import { useEffect } from "react";
import { STATE } from "../App";

const Results = ({ isWin, setState, setBgm }) => {
    const bgm = isWin ? winBGM : loseBGM;
    useEffect(() => setBgm(bgm), []);

    return (
        <div className="results-container">
            <div
                className={`results-content ${
                    isWin ? "results__win" : "results__lose"
                }`}
            >
                <div className="results-header">
                    {isWin ? "YOU WIN" : "YOU LOST"}
                </div>
                <div className="results-actions">
                    <button
                        className="btn"
                        onClick={() => setState(STATE.GAMEPLAY)}
                    >
                        RETRY
                    </button>
                    <button
                        className="btn"
                        onClick={() => setState(STATE.DIFFICULTY)}
                    >
                        CHANGE <br></br> DIFFICULTY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;

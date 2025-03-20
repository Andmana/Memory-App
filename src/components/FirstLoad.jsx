import "../styles/first-load.scss";

import { useEffect, useState } from "react";
import load from "/loading.gif";
import { STATE } from "../App";

const FirstLoad = ({ handleSetState }) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFirstLoad(false);
        }, 3500);

        return () => clearTimeout(timer);
    });

    return (
        <div className="first-load">
            <img className="loading-gif" src={load} alt="" />
            {isFirstLoad ? (
                <h2 className="loading">LOADING</h2>
            ) : (
                <button
                    className="btn"
                    onClick={() => handleSetState(STATE.INTRO)}
                >
                    CONTINUE
                </button>
            )}

            <div className="disclaimer-message">
                <p>
                    This game is not associated with, endorsed by, or in any way
                    affiliated with the Pokémon Company or its affiliates. It is
                    a program created solely for learning purposes. I do not
                    claim ownership of, nor take credit for any images or sounds
                    used in this project. All materials used are for learning
                    and exploration only.
                </p>
            </div>
        </div>
    );
};

export default FirstLoad;

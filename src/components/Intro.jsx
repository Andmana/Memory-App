import "../styles/intro.scss";
import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import landingBGM from "../assets/musics/landing-bgm.mp3";
import introBGM from "../assets/musics/intro-bgm.mp3";

import { useEffect, useState } from "react";
import { STATE } from "../App";
import { buttonSfx } from "../utils/Sfx";

const Intro = ({ handleSetState, setBgm, isMusicPlaying }) => {
    const [isLanding, setIsLanding] = useState(true);

    const handleLanding = () => {
        setIsLanding(false);
        setBgm(introBGM);
    };

    useEffect(() => {
        setBgm(landingBGM);
        const timer = setTimeout(() => {
            setIsLanding(false);
            setBgm(introBGM);
        }, 11000);

        return () => clearTimeout(timer);
    }, []);

    if (isLanding) {
        return (
            <div className="landing-container">
                <div className="landing-header">
                    <button
                        className="btn"
                        onClick={() => {
                            handleLanding();
                            if (isMusicPlaying) buttonSfx.play();
                        }}
                    >
                        SKIP
                    </button>
                </div>
                <div className="landing-content">
                    <div className="landing__present">
                        ANDMANA <br />
                        PRESENT
                    </div>
                    <div className="landing__power">
                        <p>POWERED BY</p>
                        <img src="/pokeapi.svg" alt="POKEAPI" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="intro-container">
            <div className="intro-header">
                <img src={pokemonImg} alt="" />
            </div>
            <div className="intro-section">
                <img src={memoryImg} alt="" />
                <button
                    className="btn gelatine"
                    onClick={() => handleSetState(STATE.DIFFICULTY)}
                >
                    START
                </button>
            </div>
        </div>
    );
};

export default Intro;

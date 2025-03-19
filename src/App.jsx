import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import "./styles/app.scss";
import Nav from "./components/Nav";
import Guidance from "./components/Guidance";
import FirstLoad from "./components/FirstLoad";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Difficulty from "./components/Difficulty";
import GamePlay from "./components/GamePlay";
import Results from "./components/Results";

import introBGM from "./assets/musics/intro-bgm.mp3";
import difficultyBGM from "./assets/musics/difficulty-bgm.mp3";
import gameplayBGM from "./assets/musics/gameplay-bgm.mp3";
import winBGM from "./assets/musics/win-bgm.mp3";
import loseBGM from "./assets/musics/lose-bgm.mp3";
import landingBGM from "./assets/musics/landing-bgm.mp3";

/* 
    0. Landing
    1. Intro
    2. Set Difficulty
    3. WIN
    4. LOSE
*/

const bgms = {
    99: landingBGM,
    0: introBGM,
    1: difficultyBGM,
    2: gameplayBGM,
    3: loseBGM,
    4: winBGM,
};

function App() {
    const [state, setState] = useState(0);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const [bgm, setBgm] = useState(landingBGM);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const soundRef = useRef(null);
    const hasMusicStarted = useRef(false);

    const [difficulty, setDifficulty] = useState("hard");

    const handleSetState = (val) => {
        setState(val);
        setBgm(bgms[val]);
    };

    const handleDifficulty = ({ target }) => {
        const diff = target.dataset.diff;
        setDifficulty(diff);
        setBgm(bgms[2]);
        setState(2);
    };

    // Change bgm
    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
        }

        soundRef.current = new Howl({
            src: [bgm],
            html5: true,
            loop: true,
            volume: 1,
        });

        if (isMusicPlaying) {
            soundRef.current.play();
        }

        return () => {
            soundRef.current.stop();
            soundRef.current.unload();
        };
    }, [bgm]);

    // play / pause music
    useEffect(() => {
        if (!soundRef.current) return;

        if (isMusicPlaying) {
            soundRef.current.play();
        } else {
            soundRef.current.pause();
        }
    }, [isMusicPlaying]);

    // first mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setFirstLoad(false);
            setBgm(landingBGM);

            if (!hasMusicStarted.current) {
                setIsMusicPlaying(true);
                hasMusicStarted.current = true;
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    if (isFirstLoad && state === 0) return <FirstLoad />;

    return (
        <>
            <div className="app">
                <nav>
                    <Nav
                        setIsGuideOpen={setIsGuideOpen}
                        setIsMusicPlaying={setIsMusicPlaying}
                        isMusicPlaying={isMusicPlaying}
                    />
                </nav>
                <main>
                    {state === 0 && (
                        <Intro
                            handleSetState={handleSetState}
                            setBgm={setBgm}
                        />
                    )}

                    {state === 1 && (
                        <Difficulty
                            handleDifficulty={handleDifficulty}
                            setBgm={setBgm}
                        />
                    )}

                    {state === 2 && (
                        <GamePlay
                            difficulty={difficulty}
                            handleSetState={handleSetState}
                        />
                    )}

                    {state === 3 && !isGuideOpen && (
                        <Results
                            isWin={false}
                            handleSetState={handleSetState}
                        />
                    )}

                    {state === 4 && !isGuideOpen && (
                        <Results isWin={true} handleSetState={handleSetState} />
                    )}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
            <dialog className={isGuideOpen ? "show" : ""}>
                <Guidance setIsGuideOpen={setIsGuideOpen} />
            </dialog>
        </>
    );
}

export default App;

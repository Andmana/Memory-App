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

// Mapping background music to states
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
    const [hasMusicStarted, setHasMusicStarted] = useState(false);
    const [difficulty, setDifficulty] = useState("hard");

    // Function to handle state transitions
    const handleSetState = (val) => {
        setState(val);
        setBgm(bgms[val]);
    };

    // Handle difficulty changes
    const handleDifficulty = ({ target }) => {
        const diff = target.dataset.diff;
        setDifficulty(diff);
        setBgm(bgms[2]); // gameplay music
        setState(2); // move to gameplay state
    };

    // Centralized music management logic
    const manageMusicPlayback = (bgmSource) => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
        }

        soundRef.current = new Howl({
            src: [bgmSource],
            html5: true,
            loop: true,
            volume: 1,
        });

        if (isMusicPlaying) {
            soundRef.current.play();
        }
    };

    // Manage BGM when it changes
    useEffect(() => {
        manageMusicPlayback(bgm);

        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
                soundRef.current.unload();
            }
        };
    }, [bgm]);

    // Play/Pause music when the `isMusicPlaying` state changes
    useEffect(() => {
        if (!soundRef.current) return;
        if (isMusicPlaying) soundRef.current.play();
        else soundRef.current.pause();
    }, [isMusicPlaying]);

    // Handle the initial music playback after the first load
    useEffect(() => {
        const timer = setTimeout(() => {
            setFirstLoad(false);
            setBgm(landingBGM); // Set landing music

            if (!hasMusicStarted) {
                setIsMusicPlaying(true); // Start music
                setHasMusicStarted(true); // Prevent restarting music
            }
        }, 3500);

        return () => clearTimeout(timer); // Cleanup timer on unmount
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
                        <Difficulty handleDifficulty={handleDifficulty} />
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

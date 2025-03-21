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
import { buttonSfx } from "./utils/Sfx";

const STATE = {
    FIRST_LOAD: 0,
    INTRO: 1,
    DIFFICULTY: 2,
    GAMEPLAY: 3,
    WIN: 4,
    LOSE: 5,
};

function App() {
    const [state, setState] = useState(STATE.FIRST_LOAD);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [difficulty, setDifficulty] = useState("HARD");

    const [score, setScore] = useState(0);
    const [highScore, sethighScore] = useState(0);

    const [bgm, setBgm] = useState(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const soundRef = useRef(null);

    const handleSetState = (_state) => {
        setState(_state);
        if (isMusicPlaying) buttonSfx.play();
    };

    const manageMusicPlayback = (bgmSource) => {
        if (!bgmSource) return;

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
        if (isMusicPlaying) soundRef.current.fade(0, 1, 1000);
        else soundRef.current.fade(1, 0, 1000);
    }, [isMusicPlaying]);

    // Update highScore
    useEffect(() => {
        if (score > highScore) sethighScore(score);
    }, [score]);

    if (state === STATE.FIRST_LOAD)
        return <FirstLoad handleSetState={handleSetState} />;

    return (
        <>
            <div className="app">
                <nav>
                    <Nav
                        setIsGuideOpen={setIsGuideOpen}
                        setIsMusicPlaying={setIsMusicPlaying}
                        isMusicPlaying={isMusicPlaying}
                        score={score}
                        highScore={highScore}
                        showScore={state === STATE.GAMEPLAY ? true : false}
                    />
                </nav>
                <main>
                    {state === STATE.INTRO && (
                        <Intro
                            handleSetState={handleSetState}
                            setBgm={setBgm}
                            isMusicPlaying={isMusicPlaying}
                        />
                    )}

                    {state === STATE.DIFFICULTY && (
                        <Difficulty
                            handleSetState={handleSetState}
                            setDifficulty={setDifficulty}
                            setBgm={setBgm}
                        />
                    )}

                    {state === STATE.GAMEPLAY && (
                        <GamePlay
                            difficulty={difficulty}
                            handleSetState={handleSetState}
                            setBgm={setBgm}
                            isMusicPlaying={isMusicPlaying}
                            setScore={setScore}
                        />
                    )}

                    {state === STATE.LOSE && !isGuideOpen && (
                        <Results
                            isWin={false}
                            handleSetState={handleSetState}
                            setBgm={setBgm}
                        />
                    )}

                    {state === STATE.WIN && !isGuideOpen && (
                        <Results
                            isWin={true}
                            handleSetState={handleSetState}
                            setBgm={setBgm}
                        />
                    )}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
            <dialog className={isGuideOpen ? "show" : ""}>
                <Guidance
                    setIsGuideOpen={setIsGuideOpen}
                    isMusicPlaying={isMusicPlaying}
                />
            </dialog>
        </>
    );
}

export { STATE };
export default App;

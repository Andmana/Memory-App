import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import "./styles/app.scss";
import Nav from "./components/Nav";
import mainBgm from "./assets/musics/Ending.mp3";
import Guidance from "./components/Guidance";
import FirstLoad from "./components/FirstLoad";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Difficulty from "./components/Difficulty";
import GamePlay from "./components/GamePlay";
import Results from "./components/Results";

function App() {
    const [state, setState] = useState(0);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const [bgm, setBgm] = useState(mainBgm);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const soundRef = useRef(null);
    const hasMusicStarted = useRef(false);

    const [difficulty, setDifficulty] = useState("easy");

    const handleSetState = (val) => {
        setState(val);
    };

    const handleDifficulty = ({ target }) => {
        const diff = target.dataset.diff;
        setDifficulty(diff);
        setState(2);
    };

    // Change bgm
    useEffect(() => {
        soundRef.current = new Howl({
            src: [bgm],
            html5: true,
            loop: true,
            volume: 1,
        });
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

            if (!hasMusicStarted.current) {
                // setIsMusicPlaying(true);
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
                        <Intro handleSetState={handleSetState} state={state} />
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

                    {state === 3 && (
                        <Results
                            isWin={false}
                            handleSetState={handleSetState}
                        />
                    )}

                    {state === 4 && (
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

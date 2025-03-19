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

function App() {
    const [state, setState] = useState(0);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [bgm, setBgm] = useState(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const soundRef = useRef(null);
    const [hasMusicStarted, setHasMusicStarted] = useState(false);
    const [difficulty, setDifficulty] = useState("hard");

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
                        <Intro setState={setState} setBgm={setBgm} />
                    )}

                    {state === 1 && (
                        <Difficulty
                            setState={setState}
                            setDifficulty={setDifficulty}
                            setBgm={setBgm}
                        />
                    )}

                    {state === 2 && (
                        <GamePlay
                            difficulty={difficulty}
                            setState={setState}
                            setBgm={setBgm}
                        />
                    )}

                    {state === 3 && !isGuideOpen && (
                        <Results
                            isWin={false}
                            setState={setState}
                            setBgm={setBgm}
                        />
                    )}

                    {state === 4 && !isGuideOpen && (
                        <Results
                            isWin={true}
                            setState={setState}
                            setBgm={setBgm}
                        />
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

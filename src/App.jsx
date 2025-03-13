import { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import "./styles/app.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Guidance from "./components/Guidance";
import mainBgm from "./assets/musics/Ending.mp3";
import FirstLoad from "./components/FirstLoad";
import Intro from "./components/Intro";
import Difficulty from "./components/Difficulty";

function App() {
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [state, setState] = useState(0);
    const [difficulty, setDifficulty] = useState("");
    const [bgm, setBgm] = useState(mainBgm);
    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const soundRef = useRef(null);
    const [isFirstLoad, setFirstLoad] = useState(true);

    const handleSetState = (val) => {
        setState(val);
    };

    const handleDifficulty = ({ target }) => {
        const diff = target.dataset.diff;
        setDifficulty(diff);
        setState(2);
    };

    useEffect(() => {
        soundRef.current = new Howl({
            src: [mainBgm],
            html5: true,
            loop: true,
            volume: 1,
        });
    }, [bgm]);

    useEffect(() => {
        const timer = setInterval(() => {
            setFirstLoad(false);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (soundRef.current === null) {
            soundRef.current = new Howl({
                src: [mainBgm],
                html5: true,
                loop: true,
                volume: 1,
            });
        }

        if (isMusicPlaying) {
            soundRef.current.play();
        } else {
            soundRef.current.pause();
        }

        return () => {
            soundRef.current.pause();
        };
    }, [isMusicPlaying]);

    return (
        <>
            {isFirstLoad && <FirstLoad />}
            {!isFirstLoad && (
                <>
                    <Nav
                        setIsGuideOpen={setIsGuideOpen}
                        setIsMusicPlaying={setIsMusicPlaying}
                        isMusicPlaying={isMusicPlaying}
                    />
                    <main>
                        {state === 0 && (
                            <Intro
                                handleSetState={handleSetState}
                                state={state}
                            />
                        )}

                        {state === 1 && (
                            <Difficulty handleDifficulty={handleDifficulty} />
                        )}
                    </main>
                    <Footer />
                    <Guidance
                        isOpen={isGuideOpen}
                        setIsGuideOpen={setIsGuideOpen}
                    />
                </>
            )}
        </>
    );
}

export default App;

/*
    GAME STATE
    0 INTRO
    1 SET DIFICULTY
    2 GAME PLAY
    3. GAME OVER
*/

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import "./styles/app.scss";
import Nav from "./components/Nav";
import mainBgm from "./assets/musics/Ending.mp3";
import Guidance from "./components/Guidance";

function App() {
    const [state, setState] = useState(0);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [difficulty, setDifficulty] = useState("");
    const [bgm, setBgm] = useState(mainBgm);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const soundRef = useRef(null);

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

    //First Load
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
            <div className="app">
                <nav>
                    <Nav
                        setIsGuideOpen={setIsGuideOpen}
                        setIsMusicPlaying={setIsMusicPlaying}
                        isMusicPlaying={isMusicPlaying}
                    />
                </nav>
                <main></main>
                <footer></footer>
            </div>
            <dialog className={isGuideOpen ? "show" : ""}>
                <Guidance setIsGuideOpen={setIsGuideOpen} />
            </dialog>
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

import { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import "../styles/nav.scss";
import mainMusic from "../assets/musics/Ending.mp3";

const Nav = ({ setIsGuideOpen }) => {
    const [isPlay, setPlayState] = useState(true);
    const soundRef = useRef(null);

    useEffect(() => {
        if (soundRef.current === null) {
            soundRef.current = new Howl({
                src: [mainMusic],
                html5: true,
                loop: true,
                volume: 1,
            });
        }

        if (isPlay) {
            soundRef.current.play();
        } else {
            soundRef.current.pause();
        }

        return () => {
            soundRef.current.pause();
        };
    }, [isPlay]);

    const toggleMusic = () => {
        setPlayState((prevState) => !prevState); // Toggle play/pause
    };

    return (
        <nav>
            <div className="nav">
                <button
                    className={`icon icon-music${isPlay ? "__on" : "__off"}`}
                    onClick={toggleMusic}
                ></button>
                <button
                    className="icon icon-help"
                    onClick={() => setIsGuideOpen((prevState) => !prevState)}
                ></button>
            </div>
        </nav>
    );
};

export default Nav;
